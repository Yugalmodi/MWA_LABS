const express = require("express");
const Router = express.Router();
const jobController = require("../controller/job.controller")

Router.route("/jobs")
    .get(jobController.getAllJobs)
    .post(jobController.addOneJob);

Router.route("/jobs/:jobId")
    .get(jobController.getOneJob);

module.exports = Router;