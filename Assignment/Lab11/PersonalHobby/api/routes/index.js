const express = require("express");
const Router = express.Router();

const receipeRouter = require("./receipe");
Router.use(process.env.ROUTE_RECEIPES, receipeRouter);

const userRouter = require("./user");
Router.use(process.env.ROUTE_USERS, userRouter);

const loginRouter = require("./login");
Router.use(process.env.ROUTE_LOGIN, loginRouter);

module.exports = Router;