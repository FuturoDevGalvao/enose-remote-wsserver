import { Connection } from "../database/Connection.js";
import { AbstractModel } from "./AbstractModel.js";

export class UserModel extends AbstractModel {
  constructor() {
    super();
  }

  static async getAllUsers(): Promise<void> {
    const connection = Connection.getInstance();

    const started: boolean = connection.start();

    if (started) {
      for await (const result of connection.query(`SELECT * FROM users`)) {
        console.log(result);
      }
    }
  }

  static async getSpecifyUser() {}
}
