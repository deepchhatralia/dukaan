const { ObjectId } = require("mongodb")
const { getAllCustomerAddress, insertAddress, deleteAddressById } = require("../mongodb/address")

const getAddressController = async (ctx) => {
    const { _id } = ctx.user

    const resp = await getAllCustomerAddress(_id)

    if (!resp.length) {
        ctx.body = { success: false, msg: "No addresses found" }
        return
    }

    ctx.body = { success: true, data: resp, msg: "found" }
}

const addAddressController = async (ctx) => {
    const { _id } = ctx.user
    let { address, city, state, country } = ctx.request.body

    address = address.trim()
    city = city.trim()
    state = state.trim()
    country = country.trim()

    const resp = await insertAddress({ location: { address, city, state, country }, customer_id: new ObjectId(_id) })

    ctx.body = { success: true, msg: "Added", data: resp }
}

const deleteAddressController = async (ctx) => {
    const { _id } = ctx.user
    const addressId = ctx.request.body.address_id.trim()

    const resp = await deleteAddressById(addressId, _id);

    if (!resp.deletedCount) {
        ctx.body = { success: false, msg: "Address not found" }
        return
    }
    ctx.body = { success: true, msg: "Deleted", data: resp }

}

module.exports = { getAddressController, addAddressController, deleteAddressController }