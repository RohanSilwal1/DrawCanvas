import axios from "axios";
import dotenv from "dotenv";
import ChatRoomClient from "./ChatRoomClient";

async function GetChats(roomId: string) {
  dotenv.config();
  const BACKEND_URL = process.env.BACKEND_URL;
  console.log(`response message : ${roomId}`);

  const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
  console.log(`response message : ${response.data.message}`);

  return response.data.message;
}

export default async function ChatRoom({ id }: { id: string }) {
  const messages = await GetChats(id);
  return <ChatRoomClient id={id} messages={messages} />;
}
