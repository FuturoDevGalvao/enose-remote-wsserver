export default class Sensor {
    id;
    name;
    state;
    constructor(id, name, state) {
        this.id = id;
        this.name = name;
        this.state = state;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            state: this.state,
        };
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getState() {
        return this.state;
    }
}
