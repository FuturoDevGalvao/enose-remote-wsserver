import { Connection } from "../database/Connection.js";
import { wsserver } from "../server/wsserver.js";
import dotenv from "dotenv";
import url from "url";

dotenv.config();

const connection: Connection = Connection.getInstance({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const started: boolean = connection.start({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

if (started) {
  wsserver.on("connection", async (ws, req) => {
    const pathname = url.parse(req.url).pathname;
    console.log(`Nova conexão na rota: ${pathname}`);

    ws.on("message", async (message) => {
      console.log(`Received message => ${pathname}`);

      try {
        const results: any[] = [];

        for await (const result of connection.query("SELECT * FROM users")) {
          results.push(result);
        }

        // Enviar os resultados da consulta para o cliente WebSocket
        ws.send(JSON.stringify({ results }));
      } catch (error) {
        console.error(error);
        ws.send(`Error: ${error}`);
      }
    });

    ws.send("Connected to WebSocket server!");
  });
}
