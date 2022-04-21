const express = require("express");
const Router = express.Router();
const controllerReceipe = require("../controller/receipe.controller");
const ingredientsController = require("../controller/ingredients.controller");
const tokenAuthController = require("../controller/token.auth.controller");

Router.route("/")
    .get(controllerReceipe.getAll)
    .post(tokenAuthController.validateToken, controllerReceipe.addOne);

Router.route("/:"+process.env.RECEIPEID)
    .get(controllerReceipe.getOne)
    .delete(tokenAuthController.validateToken, controllerReceipe.deleteOne)
    .put(tokenAuthController.validateToken, controllerReceipe.fullUpdateOne)
    .patch(tokenAuthController.validateToken, controllerReceipe.partialUpdateOne); 

Router.route("/:"+process.env.RECEIPEID+process.env.SUB_ROUTE_INGREDIENTS)
    .get(ingredientsController.getAll)
    .post(tokenAuthController.validateToken, ingredientsController.addOne); 
    
Router.route("/:"+process.env.RECEIPEID+process.env.SUB_ROUTE_INGREDIENTS+"/:"+process.env.INGREDIENTID)
    .get(ingredientsController.getOne)
    .delete(tokenAuthController.validateToken, ingredientsController.deleteOne)
    .put(tokenAuthController.validateToken, ingredientsController.fullUpdateOne)
    .patch(tokenAuthController.validateToken, ingredientsController.partialUpdateOne);

module.exports = Router;