const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

// Define the schema for the CircleLeader
const CircleLeaderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    workLocation: {
        type: String,
        required: true,
    },
    volunteers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Volunteer', // Assuming you have a Volunteer model
    }],
    attendance: [{
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['Present', 'Absent', 'Late'],
            required: true,
        },
    }],
}, {
    timestamps: true,
});

// Pre-save middleware to hash password
CircleLeaderSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('CircleLeader', CircleLeaderSchema)