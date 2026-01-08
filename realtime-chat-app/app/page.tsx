"use client"
import { useEffect, useState } from "react";
import ChatForm from "./components/ChatForm";
import { socket } from "../lib/socketClient";
import { ChatMsg } from "./components/ChatMsg";

export default function HomePage(){
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [left, setLeft] = useState(false);
  const [messages, setMessages] = useState<{sender: string, message: string, timestamp: string}[]>([]);
  const [username, setUserName] = useState("");

  useEffect(() => {
    socket.on("userJoined", ({message}) => {
      setMessages((prevMessages) => [...prevMessages, {sender: "system", message, timestamp: new Date().toLocaleTimeString()}]);
    });

    

    socket.on("message", (data: {sender: string, message: string, timestamp?: string}) => {
      setMessages((prevMessages) => [...prevMessages, {
        ...data,
        timestamp: data.timestamp || new Date().toLocaleTimeString()
      }]);
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
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    socket.emit("message", data);
  };

  return <div className="flex justify-center items-center w-full min-h-screen bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400">
    {!joined ? (
      <div className="flex flex-col justify-center items-center w-full max-w-md px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Join Chat Room</h2>
          <form onSubmit={handleJoin} className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input 
                type="text" 
                value={username} 
                placeholder="Enter your username" 
                required 
                onChange={(e) => setUserName(e.target.value)} 
                className="w-full px-5 py-3 border-2 border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500 text-base shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Room ID</label>
              <input 
                type="text" 
                value={room} 
                placeholder="Enter room ID" 
                required 
                onChange={(e) => setRoom(e.target.value)} 
                className="w-full px-5 py-3 border-2 border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500 text-base shadow-sm"
              />
            </div>
            <button 
              type="submit" 
              className="w-full px-8 text-white py-3 rounded-xl bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 text-base font-semibold shadow-md duration-200 mt-6"
            >
              Join Room
            </button>
          </form>
        </div>
      </div>
    ) : (
      <div className="flex flex-col mt-20 w-full max-w-4xl h-[700px] bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-white p-4 border-b border-orange-300">
          <h1 className="font-bold text-xl text-orange-600">Room {room}</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-orange-50">
          {messages.map((msg,index) =>(
            <ChatMsg
              key={index}
              message={msg.message}
              sender={msg.sender}
              isSenderMsg={msg.sender === username}
              timestamp={msg.timestamp}
            />
          ))}
        </div>
        <div className="bg-white p-4 border-t border-orange-300">
          <ChatForm onSendMessage={handleSendMessage} />
        </div>
      </div>
    )}
  </div>
}