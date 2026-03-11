"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  return (
    <div className="join-page">
      <div className="join-orb-1" />
      <div className="join-orb-2" />
      <div className="join-orb-3" />
      <div className="join-noise" />

      <div className="join-card">
        <h1 className="join-heading">
          Enter a<br />
          <em>room.</em>
        </h1>
        <p className="join-sub">
          Paste your room ID below to join the session.
        </p>

        <p className="join-field-label">Room identifier</p>
        <div className="join-input-wrap">
          <input
            className="join-input"
            type="text"
            placeholder="e.g. alpha-7f3b"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              roomId.trim() &&
              router.push(`/room/${roomId}`)
            }
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <button
          className="join-btn"
          disabled={!roomId.trim()}
          onClick={() => router.push(`/room/${roomId}`)}
        >
          Join Room →
        </button>

        <div className="join-footer">
          <div className="join-footer-line" />
          <span className="join-footer-text">end-to-end encrypted</span>
          <div className="join-footer-line" />
        </div>
      </div>
    </div>
  );
}
