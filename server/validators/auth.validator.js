import { compareSync } from "bcrypt"

const firstNameValidator = ({ fname }) => {
    let err = null;

    if (!fname) {
        err = { message: "Enter first name", field: "fname" }
        return err
    }
    fname = fname.trim()
    if (fname.length < 3) {
        err = { message: "Minimum 3 characters required", field: "fname" }
        return err
    }
    if (fname.length > 20) {
        err = { message: "Maximum 20 characters allowed", field: "fname" }
        return err
    }

    return err;
}

const lastNameValidator = ({ lname }) => {
    let err = null;

    if (!lname) {
        err = { message: "Enter last name", field: "lname" }
        return err
    }
    lname = lname.trim()
    if (lname.length < 3) {
        err = { message: "Minimum 3 characters required", field: "lname" }
        return err
    }
    if (lname.length > 20) {
        err = { message: "Maximum 20 characters allowed", field: "lname" }
        return err
    }
    return err;
}

const emailValidator = ({ email }) => {
    let err = null;

    if (!email) {
        err = { message: "Enter email", field: "email" }
        return err
    }

    email = email.trim()

    if (!(email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))) {
        err = { message: "Invalid email address", field: "email" }
        return err
    }
    return err;
}

const oldPasswordValidator = ({ password, oldPassword }) => {
    let err = null

    if (!oldPassword) {
        err = { success: false, msg: "Specify old password" }
        return err;
    }

    if (oldPassword === password) {
        err = { success: false, msg: "New password cannot be same as old password" }
        return err;
    }
    return null;
}

const passwordValidator = ({ password }) => {
    let err = null

    if (!password) {
        err = { message: "Enter password", field: "password" }
        return err;
    }

    password = password.trim()

    if (password.length < 8) {
        err = { message: "Minimum password length must be 8", field: "password" }
        return err
    }
    if (password.length > 20) {
        err = { message: "Maximum password length must be 20", field: "password" }
        return err
    }
    return err;
}

const confirmPasswordValidator = ({ password, cpassword }) => {
    let err = null

    if (!cpassword) {
        err = { message: "Enter confirm password", field: "cpassword" }
        return err;
    }

    password = password.trim()
    cpassword = cpassword.trim()

    if (cpassword !== password) {
        err = { message: "Confirm password should match", field: "cpassword" }
        return err
    }
    return err;
}

export { firstNameValidator, lastNameValidator, emailValidator, passwordValidator, confirmPasswordValidator, oldPasswordValidator }