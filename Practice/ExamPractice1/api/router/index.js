const express = require("express");
const Router = express.Router();
const jobController = require("../controller/job.controller")

Router.route("/jobs")
    .get(jobController.getAllJobs)
    .post(jobController.addOneJob);

module.exports = Router;