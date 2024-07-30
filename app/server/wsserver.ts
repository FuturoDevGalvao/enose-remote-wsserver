import dotenv from "dotenv";
import { WebSocketServer } from "ws";

dotenv.config();

const options: { [key: string]: any } = {
  port: Number.parseInt(process.env.WS_PORT as string),
};

export const wsserver = new WebSocketServer(options);

export function router(response: Response) {}
