const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
        fullname: String,
        email: String,
        phone: String,
        Active_Sessions: [{type: String}],
    },
{
    timestamps: true,
});


module.exports = mongoose.model("User", UserSchema);
