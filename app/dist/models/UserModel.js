import { AbstractModel } from "./AbstractModel.js";
export class UserModel extends AbstractModel {
    constructor() {
        super();
    }
    static async getAllUsers() {
        super.setup();
        if (super.status) {
            for await (const result of this.connection.query(`SELECT * FROM users`)) {
                console.log(result);
            }
        }
    }
    static async getSpecifyUser(id) {
        super.setup();
        if (super.status) {
            for await (const result of this.connection.query(`SELECT * FROM users WHERE id = ${id}`)) {
                console.log(result);
            }
        }
    }
}
