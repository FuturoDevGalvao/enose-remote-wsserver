import dotenv from "dotenv";
import { WebSocketServer } from "ws";

dotenv.config();

const options: { [key: string]: any } = {
  port: Number.parseInt(process.env.WS_PORT as string),
};

export const wsserver = new WebSocketServer(options);

export function router(response: Response) {}

/* wsserver.on("connection", (ws) => {
  console.log("Nova conexão estabelecida");

  ws.on("message", (message) => {
    console.log("Recebido: " + message);
    ws.send("Mensagem recebida: " + message); // Resposta ao cliente
  });
});

console.log(`Servidor WebSocket está rodando na porta ${options.port}`);
 */
