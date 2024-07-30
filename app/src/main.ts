import { UserController } from "../controllers/UserController.js";

const userController = new UserController();

setInterval(() => {
  userController.get();
}, 2000);

setInterval(() => {
  userController.get(2);
}, 3000);
