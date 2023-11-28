const { Router, query } = require("express");
const returnResult = require("../common/functions");
const handleErrorResponse = require("../common/functions");
const employerService = require("../services/employerServices");

const router = Router();

// METHOD: GET
// DESC: get all employers
router.get("/", async (req, res) => {
  try {
    const employers = await employerService.getAllEmployers();
    res.status(200).json(returnResult(true, "success", employers));
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// METHOD: GET
// DESC: get an employer by id with all details
router.get("/:id", async (req, res) => {
  try {
    const employer = await employerService.getEmployerById(req.params.id);
    if (!employer) {
      res.status(404).json(returnResult(false, "Employer not found", null));
      return;
    }
    res.status(200).json(returnResult(true, "success", employer));
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// METHOD: POST
// DESC: create a new employer
// required: [name:string, salary:number, degree:string, job_id:number]
router.post("/add", async (req, res) => {
  try {
    const { name, salary, degree, job_id } = req.body;
    const newEmployer = await employerService.createEmployer(name, salary, degree, job_id);
    res.status(201).json(returnResult(true, "successfully created", newEmployer));
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// METHOD: PUT
// DESC: update an employer by id
// all optional: [name:string, salary:number, degree:string, job_id:number]
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary, degree, job_id } = req.body;
    const updatedEmployer = await employerService.updateEmployer(id, name, salary, degree, job_id);

    if (!updatedEmployer) {
      res.status(404).json(returnResult(false, "Employer not found", null));
      return;
    }

    res.status(201).json(returnResult(true, "successfully updated", updatedEmployer));
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

// METHOD: DELETE
// DESC: delete an employer by id

router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployerId = await employerService.deleteEmployer(req.params.id);

    if (!deletedEmployerId) {
      res.status(404).json(returnResult(false, "Employer not found", null));
      return;
    }

    res.status(204).json(returnResult(true, "successfully deleted", []));
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

module.exports = router;
