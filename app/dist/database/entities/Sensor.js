export default class Sensor {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
        };
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
}
