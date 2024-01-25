class User {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
    }

    getObj() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
        }
    }
}

module.exports = User