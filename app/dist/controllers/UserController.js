import UserModel from "../models/UserModel.js";
import AbstractController from "./AbstractController.js";
export default class UserController extends AbstractController {
    static async get(id) {
        if (id)
            return await UserModel.getSpecifyUser(id);
        return await UserModel.getAllUsers();
    }
}
