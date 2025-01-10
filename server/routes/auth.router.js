import KoaRouter from "koa-router";
const router = new KoaRouter({ prefix: "/api/v1/auth" });

import roles from "../constants/roles";
import auth2Middleware from "../middleware/auth2.middleware";
import validate from "../middleware/validate.middleware";

import {
  emailValidator,
  passwordValidator,
  firstNameValidator,
  confirmPasswordValidator,
  lastNameValidator,
  oldPasswordValidator,
} from "../validators/auth.validator";

import {
  emailExistValidator,
  emailDoesntExistValidator,
  unexpiredTokenExist,
  findStaffAndVerifyPassword,
} from "../db.validators/auth.db.validator";
import dbValidate from "../middleware/dbValidate.middleware";
import {
  loginController,
  signupController,
  changePasswordController,
  sendResetLink,
  verifyResetToken,
} from "../controller/auth.controller";

router.get("/getProducts", auth2Middleware([roles.CUSTOMER]), (ctx) => {
  ctx.body = [
    { name: "Speaker", price: 899, company: "boAt", desc: "boAt speaker" },
    {
      name: "Phone",
      price: 9999,
      company: "Samsung",
      desc: "Samsung phone A12",
    },
  ];
});

// router.post('/c/login',
//     validate([emailValidator, passwordValidator]),
//     dbValidate([emailDoesntExistValidator]),
//     loginController
// )

router.post(
  "/login",
  validate([emailValidator, passwordValidator]),
  dbValidate([emailDoesntExistValidator]),
  loginController
);

router.post(
  "/signup",
  validate([
    firstNameValidator,
    lastNameValidator,
    emailValidator,
    passwordValidator,
    confirmPasswordValidator,
  ]),
  dbValidate([emailExistValidator]),
  signupController
);

router.post(
  "/changePassword",
  auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER, roles.STAFF]),
  validate([oldPasswordValidator, passwordValidator, confirmPasswordValidator]),
  dbValidate([findStaffAndVerifyPassword]),
  changePasswordController
);

router.post(
  "/sendResetLink",
  // auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.STAFF]),
  validate([emailValidator]),
  dbValidate([emailDoesntExistValidator]),
  sendResetLink
);

router.post(
  "/verifyResetToken",
  auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.STAFF, 10]),
  validate([passwordValidator, confirmPasswordValidator]),
  dbValidate([unexpiredTokenExist]),
  verifyResetToken
);

export default router;
