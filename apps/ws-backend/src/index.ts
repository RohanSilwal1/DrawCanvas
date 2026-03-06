import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
const wss = new WebSocketServer({ port: 8080 })
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

function checkUser(token: string): string |null {
    const decoded = jwt.verify(token, JWT_SECRET)

    if (typeof decoded == "string") {
        return null
    }
    if (!decoded || !decoded.userId) {
        return null
    }
    return decoded.userId;
}

wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if (!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    const userAuthenticated=checkUser(token)
    if(!userAuthenticated){
        ws.close();
    }
    ws.on("message", function message(data) {
        ws.send("pong");
    })
})