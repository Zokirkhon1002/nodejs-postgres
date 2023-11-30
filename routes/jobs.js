const { Router } = require("express");
const returnResult = require("../common/functions");
const handleErrorResponse = require("../common/functions");
const jobService = require("../services/jobServices");

const router = Router();

// METHOD: GET
// DESC: get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.status(200).json(returnResult(true, "success", jobs));
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// METHOD: POST
// DESC: create a new job
// required: [title:string]
router.post("/add", async (req, res) => {
  try {
    let { title } = req.body;
    const newJob = await jobService.createJob(title);
    res.status(201).json(returnResult(true, "success", newJob));
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// METHOD: DELETE
// DESC: delete an job by id if id is connected with employer table, as well as employer
router.delete("/:id", async (req, res) => {
  try {
    const deleteJobId = await jobService.deleteJob(req.params.id);
    if (!deleteJobId) {
      res.status(404).json(returnResult(false, "Employer not found", null));
      return;
    }
    res.status(200).json(returnResult(true, "success", []));
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

module.exports = router;
