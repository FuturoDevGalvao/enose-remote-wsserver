import { Connection } from "../database/Connection.js";
export default class AbstractModel {
    static table;
    static connection;
    static status;
    static setup() {
        this.connection = Connection.getInstance();
        this.status = this.connection.start();
    }
}
