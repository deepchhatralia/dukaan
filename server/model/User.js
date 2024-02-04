class User {
    constructor(firstName, lastName, email, password, role = 0) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.role = 0
    }

    getObj() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            role: this.role
        }
    }
}

module.exports = User