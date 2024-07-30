import { Connection } from "../database/Connection.js";
import { AbstractModel } from "./AbstractModel.js";
export class UserModel extends AbstractModel {
    static connection;
    static status;
    constructor() {
        super();
    }
    static setup() {
        this.connection = Connection.getInstance();
        this.status = this.connection.start();
    }
    static async getAllUsers() {
        UserModel.setup();
        if (this.status) {
            for await (const result of this.connection.query(`SELECT * FROM users`)) {
                console.log(result);
            }
        }
    }
    static async getSpecifyUser(id) {
        UserModel.setup();
        if (this.status) {
            for await (const result of this.connection.query(`SELECT * FROM users WHERE id = ${id}`)) {
                console.log(result);
            }
        }
    }
}
