const express = require("express");
const Router = express.Router();
const controllerUser = require("../controller/user.controller");

Router.route("/")
    .post(controllerUser.login);

module.exports = Router;