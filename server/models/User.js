const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    Username:{type: String, required: true},
    name: String,
    Cycles:{type: Number, required:true}
},
{collection: "users"}
)

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;