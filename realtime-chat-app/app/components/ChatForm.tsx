"use client"
import React, { useState } from 'react';

const ChatForm=({
    onSendMessage,
}: {
    onSendMessage :(message:string)=>void;
}) => {
    const [message, setMessage] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(message.trim() !== ""){
            setMessage(""); 
            onSendMessage(message);
        }
    };

    return (
    <form onSubmit={handleSubmit} className="flex gap-3">
        <input 
            type="text" 
            onChange={(e)=> setMessage(e.target.value)} 
            value={message}
            className="flex-1 px-5 py-3 border-2 border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-orange-600 text-base shadow-sm" 
            placeholder="Type your message..."
        />
        <button 
            type="submit" 
            className="px-8 text-orange-600 py-3 rounded-xl bg-white hover:bg-orange-50 focus:ring-2 focus:ring-orange-400 text-base font-medium shadow-md hover:shadow-lg flex items-center gap-2"
        >
            Send
        </button>
    </form>
    );
};

export default ChatForm;