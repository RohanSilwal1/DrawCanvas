"use client";

import { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export default function ChatRoomClient({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) {
  const { socket, loading } = useSocket();
  const [chat, setChat] = useState(messages);
  const [currentMessage, setCurrentMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (socket && !loading) {
      socket.send(JSON.stringify({ type: "join_room", roomId: id }));
      socket.onmessage = (event) => {
        const ParsedData = JSON.parse(event.data);
        if (ParsedData.type === "chat") {
          setChat((c) => [...c, { message: ParsedData.message }]);
        }
      };
    }
  }, [socket, loading, id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = () => {
    if (!currentMessage.trim()) return;
    socket?.send(JSON.stringify({ type: "chat", roomId: id, message: currentMessage }));
    setCurrentMessage("");
  };

  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md flex flex-col h-[600px] bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 shrink-0">
            <h2 className="text-white font-semibold text-lg tracking-wide">Room</h2>
            <p className="text-slate-400 text-xs font-mono mt-0.5">{id}</p>
          </div>

          {loading && (
            <div className="px-6 py-2 bg-yellow-500/10 border-b border-yellow-500/20">
              <p className="text-yellow-400 text-xs">Connecting to socket...</p>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
            {chat.length === 0 && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-slate-500 text-sm">No messages yet. Say something!</p>
              </div>
            )}
            {chat.map((m, i) => (
              <div key={i} className="flex justify-start">
                <div className="px-4 py-2 rounded-2xl rounded-bl-sm max-w-[75%] text-sm leading-relaxed break-words bg-white/10 text-slate-200">
                  {m.message}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-4 border-t border-white/10 flex gap-3 items-center shrink-0">
            <div className="glow-wrapper flex-1">
              <input
                className="glow-input"
                type="text"
                placeholder="Type a message..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
            </div>

            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={loading || !currentMessage.trim()}
            >
              <span>Send</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}