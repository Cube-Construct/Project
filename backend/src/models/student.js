const mongoose = require('mongoose');

const schema = mongoose.Schema;

const studentSchema = new schema({
    unqId: {
        type: String,
        required: [true, "Students Id is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    documents: {
        type: [String],
        required: [true, "Grade Cards are required"],
    },
    status: {
        enum: ["pending", "approved", "rejected"],
        type: String,
        default: "pending",
    }
})   

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
