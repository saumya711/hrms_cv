const express = require("express");
const cvUploadMiddleware = require("../middleware/cvUploadMiddleware");
const { postApplicantDetails, getApplicantDetails, getApplicantDetailsByPosition } = require("../controllers/applicantController");
const router = express.Router();

router.post("/post-applicant-details", cvUploadMiddleware.uploadFile, postApplicantDetails);
router.get("/get-applicant-details", getApplicantDetails);
router.get("/get-details-by-position/:position", getApplicantDetailsByPosition);


module.exports = router