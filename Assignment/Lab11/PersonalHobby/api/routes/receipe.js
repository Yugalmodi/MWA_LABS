const express = require("express");
const Router = express.Router();
const controllerReceipe = require("../controller/receipe.controller")
const ingredientsController = require("../controller/ingredients.controller")

Router.route("/")
    .get(controllerReceipe.getAll)
    .post(controllerReceipe.addOne);

Router.route("/:"+process.env.RECEIPEID)
    .get(controllerReceipe.getOne)
    .delete(controllerReceipe.deleteOne)
    .put(controllerReceipe.fullUpdateOne)
    .patch(controllerReceipe.partialUpdateOne); 

Router.route("/:"+process.env.RECEIPEID+process.env.SUB_ROUTE_INGREDIENTS)
    .get(ingredientsController.getAll)
    .post(ingredientsController.addOne); 
    
Router.route("/:"+process.env.RECEIPEID+process.env.SUB_ROUTE_INGREDIENTS+"/:"+process.env.INGREDIENTID)
    .get(ingredientsController.getOne)
    .delete(ingredientsController.deleteOne)
    .put(ingredientsController.fullUpdateOne)
    .patch(ingredientsController.partialUpdateOne);

module.exports = Router;