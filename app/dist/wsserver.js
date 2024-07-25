import dotenv from "dotenv";
import { WebSocketServer } from "ws";
dotenv.config();
const options = {
    port: Number.parseInt(process.env.WS_PORT),
};
export const wsserver = new WebSocketServer(options);
export function router(response) { }
/* wsserver.on("connection", (ws) => {
  console.log("Nova conexão estabelecida");

  ws.on("message", (message) => {
    console.log("Recebido: " + message);
    ws.send("Mensagem recebida: " + message); // Resposta ao cliente
  });
});

console.log(`Servidor WebSocket está rodando na porta ${options.port}`);
 */
