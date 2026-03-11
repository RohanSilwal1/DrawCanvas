import dotenv from "dotenv";
import { useEffect, useState } from "react";

export default function useSocket(){
    dotenv.config();
    const [loading,setLoading]=useState(true);
    const [socket,setSocket]=useState<WebSocket>();
    const WS_URL=process.env.WS_URL as string;
    useEffect(()=>{
        const ws =new WebSocket(WS_URL);
        ws.onopen=()=>{
            setLoading(false);
            setSocket(ws);
        }
    })
    return {
        socket,loading 
    }
}