import { Connection } from "../database/Connection.js";
import { AbstractModel } from "./AbstractModel.js";

export class UserModel extends AbstractModel {
  constructor() {
    super();
  }

  public static async getAllUsers(): Promise<void> {
    super.setup();

    if (super.status) {
      for await (const result of this.connection.query(`SELECT * FROM users`)) {
        console.log(result);
      }
    }
  }

  public static async getSpecifyUser(id?: number) {
    super.setup();

    if (super.status) {
      for await (const result of this.connection.query(`SELECT * FROM users WHERE id = ${id}`)) {
        console.log(result);
      }
    }
  }
}
