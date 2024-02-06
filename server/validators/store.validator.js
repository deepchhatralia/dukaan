import { ObjectId } from "mongodb"


const nameValidator = ({ name }) => {
    let err = null;

    if (!name) {
        err = { message: "Enter store name", field: "name" }
        return err
    }
    name = name.trim()
    if (name.length < 3) {
        err = { message: "Minimum 3 characters required", field: "name" }
        return err
    }
    if (name.length > 20) {
        err = { message: "Maximum 20 characters allowed", field: "name" }
        return err
    }

    return err;
}

const storeLinkValidator = ({ store_link }) => {
    let err = null;

    if (!store_link) {
        err = { message: "Specify store link", field: "store_link" }
        return err
    }
    store_link = store_link.trim()
    if (store_link.length < 3) {
        err = { message: "Minimum 3 characters required", field: "store_link" }
        return err
    }
    if (store_link.length > 20) {
        err = { message: "Maximum 20 characters allowed", field: "store_link" }
        return err
    }

    return err;
}

const contactValidator = ({ contact }) => {
    let err = null;

    if (!contact) {
        err = { message: "Enter contact", field: "contact" }
        return err
    }
    if (typeof contact !== 'number') {
        err = { message: "Invalid contact number", field: "contact" }
        return err
    }
    if (!contact) {
        err = { message: "Invalid contact number", field: "contact" }
        return err
    }

    if (contact.length < 10 || contact.length > 10) {
        err = { message: "Invalid contact number", field: "contact" }
        return err
    }

    return err;
}

const isOpenValidator = ({ isOpen }) => {
    let err = null;

    if (isOpen !== true && isOpen !== false) {
        err = { message: "Invalid value for store status", field: "isOpen" }
        return err
    }

    return err;
}

const merchantIdValidator = ({ merchant_id }) => {
    let err = null;


    if (!merchant_id) {
        err = { message: "Specify merchant id", field: "merchant_id" }
        return err
    }
    merchant_id = merchant_id.trim()

    try {
        const temp = new ObjectId(merchant_id)
    } catch (error) {
        console.log(error.message)
        err = { message: "Invalid merchant id", field: "merchant_id" }
        return err
    }

    return err;
}


const cityValidator = ({ city }) => {
    let err = null;

    if (!city) {
        err = { message: "Enter city", field: "city" }
        return err
    }

    return err;
}

const stateValidator = ({ state }) => {
    let err = null;

    if (!state) {
        err = { message: "Enter state", field: "state" }
        return err
    }

    return err;
}

const countryValidator = ({ country }) => {
    let err = null;

    if (!country) {
        err = { message: "Enter country", field: "country" }
        return err
    }

    return err;
}

const storeIdValidator = ({ store_id }) => {
    let err = null;

    if (!store_id) {
        err = { message: "Specify store id", field: "store_id" }
        return err
    }
    store_id = store_id.trim()
    try {
        const temp = new ObjectId(store_id)
    } catch (error) {
        console.log(error.message)
        err = { message: "Invalid store id", field: "store_id" }
        return err
    }

    return err;
}

export { nameValidator, storeLinkValidator, contactValidator, isOpenValidator, merchantIdValidator, cityValidator, stateValidator, countryValidator, storeIdValidator }