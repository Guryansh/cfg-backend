require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");


//Routes
const homeRoutes = require("./routes/home.route");
const studentRoutes = require("./routes/student.route");
const volunteerRoutes = require("./routes/volunteer.route");
const databaseURL = process.env.DATABASE_URL;

//Routes Middleware
app.use('/', homeRoutes);
app.use('/student', studentRoutes);
app.use('/volunteer', volunteerRoutes);

mongoose.connect(databaseURL).then(() => console.log("Connected to database"))
    .catch(err => console.log(err.message));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
