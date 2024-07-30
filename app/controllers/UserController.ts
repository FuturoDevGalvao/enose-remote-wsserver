import { UserModel } from "../models/UserModel.js";
import { AbstractController } from "./AbstractController.js";

export class UserController extends AbstractController {
  async get(): Promise<void> {
    UserModel.getAllUsers();
  }
}
