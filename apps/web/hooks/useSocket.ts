import dotenv from "dotenv";
import { useEffect, useState } from "react";

export function useSocket() {
    const WS_URL = process.env.NEXT_PUBLIC_WS_URL as string;
    console.log(`WS_URL ${WS_URL}`);

    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();
    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}? remaning to add jwt token here `);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);
    return {
        socket, loading
    }
}