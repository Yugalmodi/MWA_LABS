const express = require("express");
const Router = express.Router();
const gameController = require("../controller/game.controller");
const userController = require("../controller/user.controller");

Router.route("/register")
    .post(userController.registerOneUser);

Router.route("/games")
    .get(gameController.getAllGames)
    .post(gameController.addOne);

Router.route("/games/:gameId")
    .get(gameController.getOne)
    .delete(gameController.deleteOne);
    
module.exports = Router;