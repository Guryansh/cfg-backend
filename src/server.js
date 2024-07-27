require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());


//Routes
const homeRoutes = require("./routes/home.route");
const studentRoutes = require("./routes/student.route");

//Routes Middleware
app.get('/', homeRoutes);
app.get('/student', studentRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
