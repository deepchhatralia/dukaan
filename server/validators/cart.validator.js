const quantityValidator = ({ qty }) => {
    let err = null;

    if (!qty && qty !== 0) {
        err = { message: 'Specify quantity', field: 'qty' };
        return err
    }

    if (typeof qty !== 'number') {
        err = { message: "Invalid quantity", field: "qty" }
        return err
    }

    if (qty < 1) {
        err = { message: 'Minimum 1 quantity required', field: 'qty' };
        return err
    }

    if (qty > 3) {
        err = { message: 'Maximum 3 quantity allowed', field: 'qty' };
        return err
    }

    return err
}

export { quantityValidator }