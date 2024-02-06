import { ObjectId } from "mongodb"

const addressValidator = ({ address }) => {
    let err = null;

    if (!address) {
        err = { message: "Specify address", field: "address" }
        return err
    }
    address = address.trim()

    if (address < 10) {
        err = { message: "Minimum 10 characters required", field: "address" }
        return err
    }

    if (address > 150) {
        err = { message: "Maximum 150 characters allowed", field: "address" }
        return err
    }

    return err;
}

const addressIdValidator = ({ address_id }) => {
    let err = null;

    if (!address_id) {
        err = { message: "Specify address id", field: "address_id" }
        return err
    }
    address_id = address_id.trim()

    try {
        const temp = new ObjectId(address_id)
    } catch (error) {
        console.log(error.message)
        err = { message: "Invalid address id", field: "address_id" }
        return err
    }

    return err;
}

export { addressValidator, addressIdValidator }