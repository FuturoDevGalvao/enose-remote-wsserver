import Sensor from "../database/entities/Sensor.js";
import AbstractModel from "./AbstractModel.js";
export default class SensorsModel extends AbstractModel {
    static async getAllSensors() {
        try {
            this.setup();
            if (this.status) {
                const sensors = [];
                for await (const sensorsQuery of this.connection.query("SELECT * FROM sensors")) {
                    sensorsQuery.forEach((sensor) => {
                        sensors.push(new Sensor(sensor.id, sensor.name));
                    });
                }
                return sensors;
            }
            return [];
        }
        catch (error) {
            console.log(`Error: ${error}`);
        }
        finally {
            this.connection.close();
        }
    }
    static async getSpecifySensor(id) {
        try {
            this.setup();
            if (this.status) {
                for await (const sensorQuery of this.connection.query(`SELECT * FROM sensors WHERE id = ${id}`)) {
                    return new Sensor(sensorQuery[0].id, sensorQuery[0].name);
                }
            }
            return null;
        }
        catch (error) {
            console.log(`Error: ${error}`);
        }
        finally {
            this.connection.close();
        }
    }
}
