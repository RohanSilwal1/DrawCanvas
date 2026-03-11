import axios from "axios";
import dotenv from "dotenv";
import ChatRoom from "../../../components/ChatRoom";

async function getRoomId(slug: string) {
  dotenv.config();
  const BACKEND_URL = process.env.BACKEND_URL;
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
  return response.data.room.id;
}

export default async function ChatRoom1({
  params,
}: {
  params: { slug: string };
}) {
  const slug = (await params).slug;
  const roomId = await getRoomId(slug);
  return <ChatRoom id={roomId} />;
}
