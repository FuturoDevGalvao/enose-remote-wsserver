import { Connection } from "../database/Connection.js";
import { AbstractModel } from "./AbstractModel.js";

export default class SensorsModel extends AbstractModel {
  public static async getAllSensors() {
    super.setup();

    if (super.status) {
      for await (const query of super.connection.query("SELECT * FROM sensors")) {
        console.log(query);
      }
    }
  }

  public static async getEspecifySensor(id: number): Promise<void> {
    super.setup();

    if (super.status) {
      for await (const query of super.connection.query(`SELECT * FROM sensors WHERE id = ${id}`)) {
        console.log(query);
      }
    }
  }
}
