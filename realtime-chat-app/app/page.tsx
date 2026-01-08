"use client"
import { useEffect, useState } from "react";
import ChatForm from "./components/ChatForm";
import { socket } from "../lib/socketClient";
import { ChatMsg } from "./components/ChatMsg";

export default function HomePage(){
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<{sender: string, message: string}[]>([]);
  const [username, setUserName] = useState("");

  useEffect(() => {
    socket.on("userJoined", ({message}) => {
      setMessages((prevMessages) => [...prevMessages, {sender: "system", message}]);
    });

    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("userJoined");  
      socket.off("message");
    }
}, []);

  function handleJoin(e: { preventDefault: () => void; }){
    e.preventDefault();
    if(room && username){
      socket.emit("joinRoom", {roomId: room, username});
      setJoined(true);
    }
  }

  const handleSendMessage = (message: string) => {
    const data = {
      roomId: room,
      sender: username,
      message
    };
    socket.emit("message", data);
  };

  return <div className="flex text-black justify-center w-full">
    {!joined ? (
      <div className="flex mt-30 flex-col justify-center items-center">
        <form onSubmit={handleJoin} className="flex flex-col bg-gray-300 p-6 mt-20 rounded-lg">
          <label className="font-bold">UserName</label>
          <input type="text" value={username} placeholder="Enter your username" required onChange={(e) => setUserName(e.target.value)} className="border border-gray-400 p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <label className="font-bold">Room ID</label>
          <input type="text" value={room} placeholder="Enter room ID" required onChange={(e) => setRoom(e.target.value)} className="border border-gray-400 p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <button type="submit" className="border border-gray-400 bg-gray-400 p-2 mb-2 rounded focus:ring-2 focus:ring-blue-500">Join Room</button>
        </form>
      </div>
    ) : (
      <div className="w-full mt-20 max-w-3xl">
      <h1 className="font-bold">Room 1</h1>
      <div className="h-[420px] overflow-y-auto p-4 mb-4 bg-gray-200 border-2 rounded-lg">
        {messages.map((msg,index) =>(
          <ChatMsg
            key={index}
            sender={msg.sender}
            message={msg.message}
            isSenderMsg={msg.sender === username}
          />
        ))}
      </div>
      <div>
        Add Chat Room
      </div>
      <ChatForm onSendMessage={handleSendMessage} />
    </div>
    )}
  </div>
}