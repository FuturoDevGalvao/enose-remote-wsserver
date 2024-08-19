import { v4 as uuidv4 } from "uuid";
export default class UserService {
    clients;
    constructor() {
        this.clients = new Map();
    }
    addClient(ws) {
        const clientId = uuidv4();
        this.clients.set(clientId, ws);
        return clientId;
    }
    removeClient(clientId) {
        this.clients.delete(clientId);
    }
    getClient(clientId) {
        return this.clients.get(clientId);
    }
}
