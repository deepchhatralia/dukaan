const customerIdValidator = (_, ctx) => {
    let err = null;

    // const customer_id = ctx.params?.customerId;

    if (!customer_id) {
        err = { message: "Specify customer id", field: "customer_id" }
        return err
    }
    customer_id = customer_id.trim()

    try {
        const temp = new ObjectId(customer_id)
    } catch (error) {
        console.log(error.message)
        err = { message: "Invalid customer id", field: "customer_id" }
        return err
    }

    return err;
}

export { customerIdValidator }