const express = require("express");
const router = express.Router();
const gameController = require("../controller/game.controller")
const publisherController = require("../controller/publisher.controller")
const reviewCOntroller = require("../controller/review.controller")

router.route("/games")
    .get(gameController.getAll)
    .post();

router.route("/games/:gameId")
    .get(gameController.getOne)
    .post()
    .delete(gameController.deleteOne);

router.route("/games/:gameId/publisher")
    .get(publisherController.getOne)
    .post();

router.route("/games/:gameId/reviews")
    .get(reviewCOntroller.getAll)
    .post();

router.route("/games/:gameId/reviews/:reviewId")
    .get(reviewCOntroller.getOne)
    .post();
module.exports = router;