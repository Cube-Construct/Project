const mongoose = require('mongoose');

const schema = mongoose.Schema;

const companySchema = new schema({
    orgName: {
        type: String,
        required: [true, "Organization Name is required"],
    },
    orgEmail: {
        type: String,
        required: [true, "Email is required"],
    },
    studentsCount: {
        type: Number,
        required: [true, "Students Count is required"],
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
    },
    isVerified: {   
        type: Boolean,
        default: false
    },
}, { 
    timestamps: {
        currentTime: () => Date.now() + 19800000
    }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;