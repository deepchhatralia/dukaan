import { findInvitedStaff } from "../mongodb/invitedStaff";
import { findUserByEmail } from "../mongodb/user";
import { decodeJwt } from "../service/jwtService";

const auth2Middleware = (roles) => {
  return async (ctx, next) => {
    const token = ctx.header["authorization"];

    if (!token) {
      ctx.body = { success: false, msg: "Unauthorized!" };
      return;
    }

    const user = decodeJwt(token);

    if (!user) {
      ctx.body = { success: false, msg: "Authentication error 1" };
      return;
    }

    if (!roles.some((role) => role === user.role)) {
      ctx.body = { success: false, msg: "Unauthorized role" };
      return;
    }

    const dbUser = await findUserByEmail(user.email);

    if (!dbUser) {
      ctx.body = { success: false, msg: "User doesnt exist" };
      return;
    }

    ctx.user = dbUser;

    return next();
  };
};

export default auth2Middleware;
