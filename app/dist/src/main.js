import UserController from "../controllers/UserController.js";
import SensorController from "../controllers/SensorsController.js";
import { wsserver } from "../server/wsserver.js";
import UserService from "../services/UserService.js";
import url from "url";
const userService = new UserService();
wsserver.on("connection", async (ws, req) => {
    const parsedUrl = url.parse(req.url, true);
    const uri = parsedUrl.pathname;
    const queryParams = parsedUrl.query;
    console.log(`Nova conexão na rota: ${uri}`);
    console.log(`Query params: ${JSON.stringify(queryParams)}`);
    ws.on("message", async (message) => {
        console.log(`Received message => ${message}`);
        console.log(`For uri => ${uri}`);
        try {
            switch (uri) {
                case "/users":
                    await UserController.handleUserRequests(ws, queryParams);
                    break;
                case "/sensors":
                    await SensorController.handleSensorRequests(ws, queryParams, message);
                    break;
                default:
                    ws.send(JSON.stringify({
                        status: 400,
                        error: `Invalid URI ${uri}, please review and try again.`,
                    }));
                    console.error(`Invalid URI: ${uri}`);
            }
        }
        catch (error) {
            console.error(error);
            ws.send(JSON.stringify({ status: 500, error: `Error: ${error.message}` }));
        }
    });
    ws.on("close", () => {
        console.log(`Client ${ws} disconnected.`);
    });
});
