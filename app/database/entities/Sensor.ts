export default class Sensor {
  private id: number;
  private name: string;
  private state: boolean;

  constructor(id: number, name: string, state: boolean) {
    this.id = id;
    this.name = name;
    this.state = state;
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      state: this.state,
    };
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getState(): boolean {
    return this.state;
  }
}
