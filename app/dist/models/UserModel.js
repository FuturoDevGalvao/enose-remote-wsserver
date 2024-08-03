import User from "../database/entities/User.js";
import AbstractModel from "./AbstractModel.js";
export default class UserModel extends AbstractModel {
    constructor() {
        super();
    }
    static async getAllUsers() {
        try {
            this.setup();
            if (this.status) {
                const users = [];
                for await (const usersQuery of this.connection.query(`SELECT id, name, email, email_validated, validation_token, created_at FROM users`)) {
                    usersQuery.forEach((user) => {
                        users.push(new User(user.id, user.name, user.email, user.email_validated, user.validation_token, new Date(user.createdAt)));
                    });
                }
                return users;
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
    static async getSpecifyUser(id) {
        try {
            this.setup();
            if (this.status) {
                for await (const userQuery of this.connection.query(`SELECT * FROM users WHERE id = ${id}`)) {
                    return new User(userQuery[0].id, userQuery[0].name, userQuery[0].email, userQuery[0].emailValidated, userQuery[0].validationToken, new Date(userQuery[0].createdAt));
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
