import { getCustomerCartById } from "../mongodb/cart";

const checkAvailability = async (ctx) => {
  let err = null;
  const unavailableProducts = [];

  const store_id = ctx.user.store_id;
  const customer_id = ctx.user._id;

  const cart = await getCustomerCartById(customer_id, store_id);

  if (!cart.length) {
    err = { msg: "Cart doesnt exist", success: false };
    return err;
  }

  cart.forEach((val) => {
    if (val.cartInfo.qty > val.product_detail[0].product_stock) {
      unavailableProducts.push(val.product_detail[0]._id);
    }
  });

  if (unavailableProducts.length) {
    err = {
      msg: "1 or more products are unavailable",
      success: false,
      unavailableProducts,
    };
    return err;
  }
  ctx.user["cart"] = cart;
  return err;
};

export { checkAvailability };
