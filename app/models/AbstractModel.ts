import { Connection } from "../database/Connection.js";

export abstract class AbstractModel {
  protected static table: string;
  protected static connection: Connection;
  protected static status: boolean;

  protected static setup() {
    this.connection = Connection.getInstance();

    this.status = this.connection.start();
  }
}
