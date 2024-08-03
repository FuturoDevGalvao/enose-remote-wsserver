import Sensor from "../database/entities/Sensor.js";
import AbstractModel from "./AbstractModel.js";

export default class SensorsModel extends AbstractModel {
  public static async getAllSensors(): Promise<Array<Sensor>> {
    try {
      this.setup();

      if (this.status) {
        const sensors: Array<Sensor> = [];

        for await (const sensorsQuery of this.connection.query("SELECT * FROM sensors")) {
          sensorsQuery.forEach((sensor: any) => {
            sensors.push(new Sensor(sensor.id, sensor.name));
          });
        }

        return sensors;
      }

      return [];
    } catch (error) {
      console.log(`Error: ${error}`);
    } finally {
      this.connection.close();
    }
  }

  public static async getSpecifySensor(id: number): Promise<Sensor> {
    try {
      this.setup();

      if (this.status) {
        for await (const sensorQuery of this.connection.query(
          `SELECT * FROM sensors WHERE id = ${id}`
        )) {
          return new Sensor(sensorQuery[0].id, sensorQuery[0].name);
        }
      }

      return null;
    } catch (error) {
      console.log(`Error: ${error}`);
    } finally {
      this.connection.close();
    }
  }
}
