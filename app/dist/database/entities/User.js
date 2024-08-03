export default class User {
    id;
    name;
    email;
    emailValidated;
    validationToken;
    createdAt;
    constructor(id, name, email, emailValidated, validationToken, createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.emailValidated = emailValidated;
        this.validationToken = validationToken;
        this.createdAt = createdAt;
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
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    getEmailValidated() {
        return this.emailValidated;
    }
    setEmailValidated(emailValidated) {
        this.emailValidated = emailValidated;
    }
    getValidationToken() {
        return this.validationToken;
    }
    setValidationToken(validationToken) {
        this.validationToken = validationToken;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(createdAt) {
        this.createdAt = createdAt;
    }
}
