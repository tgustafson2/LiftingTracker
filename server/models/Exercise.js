const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema ({
    User_id:{type: String, required: true},
    Date: {type: Date, required: true},
    Reps:[Number],
    Weight:[Number],
    Name:{type: String, required: true},
    Area_of_Focus: {type:String, require: false},
    variation:{type: String, required:false}

},
{collection: "Exercise"}
)

const model = mongoose.model("ExerciseSchema", ExerciseSchema);

module.exports = model;