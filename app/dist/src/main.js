import UserController from "../controllers/UserController.js";
import { wsserver } from "../server/wsserver.js";
import url from "url";
import SensorController from "../controllers/SensorsController.js";
wsserver.on("connection", async (ws, req) => {
    const parsedUrl = url.parse(req.url, true); // Analisa a URL, incluindo os parâmetros de consulta
    const uri = parsedUrl.pathname; // Obtém o caminho da URL
    const queryParams = parsedUrl.query; // Obtém os parâmetros de consulta como um objeto
    console.log(`Nova conexão na rota: ${uri}`);
    console.log(`Query params: ${JSON.stringify(queryParams)}`);
    ws.on("message", async (message) => {
        console.log(`Received message => ${message}`);
        console.log(`For uri => ${uri}`);
        try {
            switch (uri) {
                case "/users":
                    const users = await UserController.get();
                    ws.send(UserController.render(users));
                    break;
                case "/sensors":
                    const sensors = await SensorController.get();
                    ws.send(SensorController.render(sensors));
                    break;
                default:
                    throw new Error(`A uri ${uri} é inválida, por favor, reveja o pathname e tente novamente.`);
            }
        }
        catch (error) {
            console.error(error);
            ws.send(`Error: ${error}`);
        }
    });
});
/*
setInterval(() => {
  UserController.get();
}, 2000);

setInterval(() => {
  UserController.get(2);
}, 3000);
*/
