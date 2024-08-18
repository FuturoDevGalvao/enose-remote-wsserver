export default class User {
  private id: number;
  private name: string;
  private email: string;
  private emailValidated: boolean;
  private validationToken: string;
  private createdAt: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    emailValidated: boolean,
    validationToken: string,
    createdAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.emailValidated = emailValidated;
    this.validationToken = validationToken;
    this.createdAt = createdAt;
  }

  // Implementação do método toJSON
  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      emailValidated: this.emailValidated,
      // Excluindo validationToken do JSON por razões de segurança
      createdAt: this.createdAt, // Formata a data como uma string ISO
    };
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getEmailValidated(): boolean {
    return this.emailValidated;
  }

  public setEmailValidated(emailValidated: boolean) {
    this.emailValidated = emailValidated;
  }

  public getValidationToken(): string {
    return this.validationToken;
  }

  public setValidationToken(validationToken: string) {
    this.validationToken = validationToken;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }
}
