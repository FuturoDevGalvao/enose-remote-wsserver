import User from "../database/entities/User.js";
import UserModel from "../models/UserModel.js";
import AbstractController from "./AbstractController.js";

export default class UserController extends AbstractController {
  static async get(id?: number): Promise<Array<User> | User> {
    if (id) return await UserModel.getSpecifyUser(id);

    return await UserModel.getAllUsers();
  }

  // Função para lidar com as requisições relacionadas a /users
  static async handleUserRequests(ws: any, queryParams: any) {
    try {
      const userId = queryParams?.id ? Number(queryParams.id) : undefined;

      const users = userId
        ? await UserController.get(userId)
        : await UserController.get();

      ws.send(UserController.render(users));
    } catch (error: any) {
      ws.send(
        JSON.stringify({ status: 500, error: `Failed to handle user request: ${error}` })
      );
      console.error(error);
    }
  }
}
