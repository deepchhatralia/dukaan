import { ObjectId } from "mongodb";
import {
  changeProductQuantity,
  findOrders,
  insertOrder,
  updateOrder,
} from "../mongodb/order";
import { clearCart, getCartInfo } from "../mongodb/cart";
import orderStatus from "../constants/orderStatus";

const getMerchantOrder = async (ctx) => {
  const store_id = ctx.user.store_id;
  const order_id = ctx.params.orderId.trim();

  const filter = {
    _id: new ObjectId(order_id),
    store_id: new ObjectId(store_id),
  };

  const resp = await findOrders(filter);

  if (!resp.length) {
    ctx.body = { success: false, data: resp, msg: "Order not found" };
    return;
  }
  ctx.body = { success: true, data: resp, msg: "Order found" };
};

const getAllMerchantOrders = async (ctx) => {
  const store_id = ctx.user.store_id;

  const filter = { store_id: new ObjectId(store_id) };

  const resp = await findOrders(filter);
  console.log(resp);
  console.log(store_id);

  if (!resp.length) {
    ctx.body = { success: false, data: resp, msg: "No orders found" };
    return;
  }
  ctx.body = { success: true, data: resp, msg: "Order found" };
};

const getCustomerOrder = async (ctx) => {
  const store_id = ctx.user.store_id;
  const customer_id = ctx.user._id;

  const order_id = ctx.params.orderId.trim();

  const filter = {
    _id: new ObjectId(order_id),
    customer_id: new ObjectId(customer_id),
    store_id: new ObjectId(store_id),
  };

  const resp = await findOrders(filter);

  if (!resp.length) {
    ctx.body = { success: false, data: resp, msg: "Order not found" };
    return;
  }
  ctx.body = { success: true, data: resp, msg: "Order found" };
};

const getAllCustomerOrders = async (ctx) => {
  const store_id = ctx.user.store_id;
  const customer_id = ctx.user._id;

  const filter = {
    customer_id: new ObjectId(customer_id),
    store_id: new ObjectId(store_id),
  };

  const resp = await findOrders(filter);

  if (!resp.length) {
    ctx.body = { success: false, data: resp, msg: "No orders found" };
    return;
  }
  ctx.body = { success: true, data: resp, msg: "Order found" };
};

const changeOrderStatus = async (ctx) => {
  const store_id = ctx.user.store_id;

  const orderStatus = ctx.request.body.status;
  const order_id = ctx.request.body.order_id;

  const filter = {
    store_id: new ObjectId(store_id),
    _id: new ObjectId(order_id),
  };
  const update = { $set: { status: orderStatus } };

  const resp = await updateOrder(filter, update);

  if (!resp.updatedCount) {
    ctx.body = { success: false, data: resp, msg: "Order not found" };
    return;
  }
  ctx.body = { success: true, data: resp, msg: "Updated" };
};

const placeOrder = async (ctx) => {
  const store_id = ctx.user.store_id;
  const customer_id = ctx.user._id;

  const cart = await getCartInfo(customer_id, store_id);
  console.log(cart);

  await insertOrder({
    timestamp: new Date(),
    products: cart.cartInfo,
    address: "Customer address",
    status: orderStatus.ACCEPTED,
    customer_id: new ObjectId(customer_id),
    store_id: new ObjectId(store_id),
  });

  // await clearCart(customer_id, store_id);

  await changeProductQuantity(cart.cartInfo);

  ctx.body = { success: true, msg: "Order placed" };
};

export {
  getMerchantOrder,
  getAllMerchantOrders,
  changeOrderStatus,
  getAllCustomerOrders,
  placeOrder,
};
