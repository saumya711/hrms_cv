const mongoose = require("mongoose");

const applicantSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add a mail"],
        //unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ]
    }, 
    cvFile: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    }
},{
    timestamps: true,
});

const Applicant = mongoose.model("Applicant", applicantSchema)
module.exports = Applicant