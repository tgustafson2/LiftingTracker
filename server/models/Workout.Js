const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema ({
    User_id:{type: String, required: true},
    Date: {type: Date, required: true},
    Cycle:{type:Number, required: false},
    Phase:{type:Number, required: false}

},
{collection: "Workouts"}
)

const model = mongoose.model("WorkoutSchema", WorkoutSchema);

module.exports = model;