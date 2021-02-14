const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    description: String,
    execution_date: {
        type: Date,
        required: "Execution date is required",
        validate: {
            validator: function (start_date) {
                try {
                    start_date = new Date(start_date);
                    let current_date = new Date();
                    let current_day = new Date(`${current_date.getFullYear()}-${("0" + (current_date.getMonth() + 1)).slice(-2)}-${("0"+current_date.getDate()).slice(-2)}`);
                    if (start_date < current_day) return false;
                    return true;
                } catch (err) {
                    console.log(err);
                    return false;
                }
            },
            message: 'Execution date must be later than or equal to the present day'
        }
    },
    status: {
        type: String,
        enum: ["inprogress", "done"],
        default: "inprogress"
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: "Project",
        required: "Related project is required"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Task', taskSchema);