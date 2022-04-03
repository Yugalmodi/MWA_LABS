const express = require("express");
const Router = express.Router();
const controllerReceipe = require("../controller/receipe.controller")
const ingredientsController = require("../controller/ingredients.controller")

Router.route("/receipes")
    .get(controllerReceipe.getAll)
    .post(controllerReceipe.addOne);

Router.route("/receipes/:receipeId")
    .get(controllerReceipe.getOne)
    .delete(controllerReceipe.deleteOne);

Router.route("/receipes/:receipeId/ingredients")
    .get(ingredientsController.getAll)
    .post(ingredientsController.addOne);

module.exports = Router;