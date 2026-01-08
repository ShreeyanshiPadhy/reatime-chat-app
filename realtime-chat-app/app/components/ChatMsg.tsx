import React from 'react'

interface chatmsgprops{
    sender: string;
    message :string;
    isSenderMsg : boolean;
    timestamp: string;
}

export const ChatMsg = ({ sender, message, isSenderMsg, timestamp} : chatmsgprops) => {
    const isSystemMessage = sender === "system";
    
    console.log("ChatMsg props:", { sender, message, isSenderMsg, timestamp });
    
    function formatTime(timestamp: string): React.ReactNode {
        return timestamp;
    }

    return (
        <div className={`flex ${isSystemMessage ? "justify-center" : isSenderMsg ? "justify-end" : "justify-start"} mb-4`}>
            <div className={`max-w-md px-6 py-3 rounded-lg ${
                isSystemMessage
                    ? "bg-orange-800 text-white text-center text-sx" : isSenderMsg ? "bg-orange-600 text-white" : "bg-white text-black border border-orange-200"
            }`}>
                {!isSystemMessage && (
                    <>
                        <p className={`text-base font-bold mb-1 ${isSenderMsg ? 'text-right' : 'text-left'}`}>
                            {sender}
                        </p>
                        <p className="text-base break-words">{message}</p>
                        <p className={`text-sm opacity-70 mt-2 ${isSenderMsg ? 'text-right' : 'text-left'}`}>{formatTime(timestamp)}</p>
                    </>
                )}
                {isSystemMessage && (
                    <p className="text-base break-words">{message}</p>
                )}
            </div>
        </div>
    );
}