import { v4 as uuidv4 } from "uuid";

export default class UserService {
  private clients: Map<string, WebSocket>;

  constructor() {
    this.clients = new Map();
  }

  addClient(ws: WebSocket) {
    const clientId = uuidv4();
    this.clients.set(clientId, ws);
    return clientId;
  }

  removeClient(clientId: string) {
    this.clients.delete(clientId);
  }

  getClient(clientId: string) {
    return this.clients.get(clientId);
  }
}
