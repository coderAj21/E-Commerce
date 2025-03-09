const express = require("express");
const {
  createAddress,
  getAddressById,
  updateAddress,
} = require("../../controller/userController");
const { auth } = require("../../middleware/auth");
const userRouter = express.Router();

userRouter
  .route("/address/:user_id")
  .all(auth)
  .post(createAddress)
  .get(getAddressById)
  .put(updateAddress)

module.exports = userRouter;
