import axios from "axios";
import dotenv from "dotenv";
async function GetChats(roomId: string) {
  dotenv.config();
  const BACKEND_URL = process.env.BACKEND_URL;
  const response = await axios.get(`${BACKEND_URL}/room/${roomId}`);
  return response.data.message;
}

export default async function ChatRoom({ id }: { id: string }) {
  const messages = GetChats(id);
}
