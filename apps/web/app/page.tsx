"use client";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Home() {
  const router = useRouter();
  const [roomId, setroomId] = useState("");
  return (
    <div className="flex items-center justify-center h-screen gap-5">
      <input
        className="border-neutral-50 border-2 rounded-2xl text-center h-10 w-90  "
        type="text"
        placeholder="enter your roomid"
        onChange={(e) => {
          setroomId(e.target.value);
        }}
      />
      <button
        className="bg-blue-100 text-black rounded-2xl h-10 w-20"
        onClick={() => {
          router.push(`/room${roomId}`);
        }}
      >
        Click
      </button>
    </div>
  );
}
