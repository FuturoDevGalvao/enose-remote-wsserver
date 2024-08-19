import UserModel from "../models/UserModel.js";
import AbstractController from "./AbstractController.js";
export default class UserController extends AbstractController {
    static async get(id) {
        if (id)
            return await UserModel.getSpecifyUser(id);
        return await UserModel.getAllUsers();
    }
    // Função para lidar com as requisições relacionadas a /users
    static async handleUserRequests(ws, queryParams) {
        try {
            const userId = queryParams?.id ? Number(queryParams.id) : undefined;
            const users = userId
                ? await UserController.get(userId)
                : await UserController.get();
            ws.send(UserController.render(users));
        }
        catch (error) {
            ws.send(JSON.stringify({ status: 500, error: `Failed to handle user request: ${error}` }));
            console.error(error);
        }
    }
}
