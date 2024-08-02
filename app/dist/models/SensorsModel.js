import { AbstractModel } from "./AbstractModel.js";
export default class SensorsModel extends AbstractModel {
    static async getAllSensors() {
        super.setup();
        if (super.status) {
            for await (const query of super.connection.query(`SELECT * FROM sensors WHERE id = ${id}`)) {
                console.log(query);
            }
        }
    }
    static async getEspecifySensor(id) {
        super.setup();
        if (super.status) {
            for await (const query of super.connection.query(`SELECT * FROM sensors WHERE id = ${id}`)) {
                console.log(query);
            }
        }
    }
}
