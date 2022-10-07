const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
    },
    status: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now()
    },
});

module.exports = Item = mongoose.model('student', StudentSchema);