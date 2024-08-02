import { UserModel } from "../models/UserModel.js";
import { AbstractController } from "./AbstractController.js";
export default class UserController extends AbstractController {
    static get(id) {
        if (id)
            return UserModel.getSpecifyUser(id);
        return UserModel.getAllUsers();
    }
}
