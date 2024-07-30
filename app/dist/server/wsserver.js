import dotenv from "dotenv";
import { WebSocketServer } from "ws";
dotenv.config();
const options = {
    port: Number.parseInt(process.env.WS_PORT),
};
export const wsserver = new WebSocketServer(options);
export function router(response) { }
