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
                        sensors.push(new Sensor(sensor.id, sensor.name, sensor.active));
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
            const SQL = `SELECT * FROM sensors WHERE id = ${id}`;
            if (this.status) {
                for await (const sensorQuery of this.connection.query(SQL)) {
                    return new Sensor(sensorQuery[0].id, sensorQuery[0].name, sensorQuery[0].active);
                }
            }
            return null;
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return null;
        }
        finally {
            this.connection.close();
        }
    }
    static async insertNewReadings() {
        try {
            this.setup();
            if (this.status) {
            }
        }
        catch (error) {
            console.log(`Error: ${error}`);
        }
        finally {
            this.connection.close();
        }
    }
}
