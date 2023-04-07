const cvUploadMiddleware =  require("../middleware/cvUploadMiddleware");
const asyncHandler = require('express-async-handler');
const Applicant = require("../models/applicantModel");
const multer = require('multer');

const postApplicantDetails = asyncHandler( async (req, res) => {
    try {
        const newApplicant = new Applicant({
          name: req.body.name,
          email: req.body.email,
          position: req.body.position,
          cvFile: req.file.path
        });
    
        const savedApplicant = await newApplicant.save();
    
        return res.status(201).json({
          success: true,
          message: "Applicant details saved successfully",
          data: savedApplicant
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "An error occurred while saving applicant details",
          error: error.message
        });
      }
});

const getApplicantDetails = asyncHandler( async (req, res) => {
    try {
        const applicant = await Applicant.find();
        for (let i = 0; i < applicant.length; i++) {
          applicant[i].cvFile = await cvUploadMiddleware.readFile(
              applicant[i].cvFile
          );
        }
        res.status(200).json(applicant);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
});

const getApplicantDetailsByPosition = asyncHandler( async (req, res) => {
  try {
    const applicants = await Applicant.find({ position: req.params.position });
    const filteredApplicants = [];
    for (let i = 0; i < applicants.length; i++) {
      applicants[i].cvFile = await cvUploadMiddleware.readFile(applicants[i].cvFile);
      filteredApplicants.push(applicants[i]);
    }
    res.status(200).json(filteredApplicants);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


module.exports = {
    postApplicantDetails, 
    getApplicantDetails,
    getApplicantDetailsByPosition
};
