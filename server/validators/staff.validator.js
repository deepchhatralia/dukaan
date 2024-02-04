const roles = require("../constants/roles");

const staffRoleValidator = ({ role }) => {
    let err = null;

    if (!role) {
        err = { message: "Select role", field: "role" }
        return err
    }

    if (role < roles.ADMIN || role > roles.STAFF) {
        err = { message: "Invalid role", field: "role" }
        return err;
    }
    return err;
}

module.exports = { staffRoleValidator }