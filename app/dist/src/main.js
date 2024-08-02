import UserController from "../controllers/UserController.js";
import View from "../utils/View.js";
import { wsserver } from "../server/wsserver.js";
import url from "url";
console.log(View.render([1, 2, 3, 4, 5]));
wsserver.on("connection", async (ws, req) => {
    const uri = url.parse(req.url).pathname;
    console.log(`Nova conexão na rota: ${uri}`);
    ws.on("message", async (message) => {
        console.log(`Received message => ${uri}`);
        try {
            switch (uri) {
                case "/users":
                    ws.send(View.render(UserController.get()));
                    break;
                case "/sensors":
                    break;
                default:
                    break;
            }
        }
        catch (error) {
            console.error(error);
            ws.send(`Error: ${error}`);
        }
    });
    ws.send("Connected to WebSocket server!");
});
/*
setInterval(() => {
  UserController.get();
}, 2000);

setInterval(() => {
  UserController.get(2);
}, 3000);
*/
