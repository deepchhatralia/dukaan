import { ObjectId } from "mongodb"

const orderIdValidator = ({ order_id }) => {
    let err = null;

    if (!order_id) {
        err = { message: "Specify order id", field: "order_id" }
        return err;
    }

    order_id = order_id.trim();

    try {
        const temp = new ObjectId(order_id);
    } catch (error) {
        console.log(error.message);
        err = { message: "Invalid order id", field: "order_id" };
        return err;
    }

    return err;
}

const dateAndTimeValidator = ({ date }) => {
    let err = null;

    if (!date) {
        err = { message: "Specify order date", field: "date" }
        return err;
    }

    const inputDate = new Date(date);

    if (inputDate > new Date()) {
        err = { message: "Order date cannot be in the future", field: "date" };
        return err;
    }

    return err;
}

const productsValidator = ({ products }) => {
    let err = null;

    if (!products) {
        err = { message: "Specify products", field: "products" }
        return err;
    }

    if (!Array.isArray(products)) {
        err = { message: "Products must be an array", field: "products" }
        return err;
    }

    if (!products.length) {
        err = { message: "At least 1 item required", field: "products" }
        return err;
    }

    return err;
}

const totalValidator = ({ total }) => {
    let err = null;

    if (!total) {
        err = { message: "Specify order total", field: "total" }
        return err;
    }

    if (typeof total !== 'number') {
        err = { message: "Invalid order total", field: "total" }
        return err;
    }

    return err;
}

const statusValidator = ({ status }) => {
    let err = null;

    if (!status) {
        err = { message: "Specify order status", field: "status" }
        return err
    }

    if (status !== true && status !== false) {
        err = { message: "Invalid status field", field: "status" }
        return err
    }

    return err;
}

export { orderIdValidator, dateAndTimeValidator, productsValidator, totalValidator, statusValidator };