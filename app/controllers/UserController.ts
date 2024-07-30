import { UserModel } from "../models/UserModel.js";
import { AbstractController } from "./AbstractController.js";

export class UserController extends AbstractController {
  async get(id?: number): Promise<void> {
    if (id) return UserModel.getSpecifyUser(id);

    return UserModel.getAllUsers();
  }
}
