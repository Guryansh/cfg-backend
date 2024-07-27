const mongoose = require("mongoose");
const {genSalt, hash} = require("bcrypt");

const VolunteerSchema = new mongoose.Schema({
        fullname: String,
        email: String,
        phone: String,
        role: String,
        city: String,
        password: {type: String},
        ageGroup: {type: String},
        preferences: [{type: String, required: true}],
        availability: [{type: String, required: true}],
    classRange:{
            minClass:{type: Number, required: true},
        maxClass:{type: Number, required: true},
    }
    },
    {
        timestamps: true,
    });

// VolunteerSchema.pre("save", async function (next) {
//     const salt = await genSalt(10);
//     this.password = await hash(this.password, salt);
//     next();
// })
module.exports = mongoose.model("Volunteer", VolunteerSchema);
