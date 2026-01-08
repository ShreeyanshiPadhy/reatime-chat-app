import React from 'react'

interface chatmsgprops{
    sender: string;
    message :string;
    isSenderMsg : boolean;
}

export const ChatMsg = ({ sender, message, isSenderMsg} : chatmsgprops) => {
    const isSystemMessage = sender === "system";
    return (
        <div className={`flex ${isSystemMessage ? "justify-center" : isSenderMsg ? "justify-end" : "justify-start"} mb-3`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${
                isSystemMessage
                    ? "bg-gray-800 text-white text-center text-sx" : isSenderMsg ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}>
                {!isSystemMessage && (
                    <p className="text-sm font-bold mb-1">
                        {sender}
                    </p>
                )}
                <p className="text-sm break-words">{message}</p>
            </div>
        </div>
    );
}