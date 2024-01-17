const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Appointment = require('./models/appointment.model');

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("connected to database...");
  })
  .catch(() => {
    console.log("failed connected to database");
  });


// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// app.use(express.static('uploads'));

app.set('view engine', 'ejs');

// Routes
const appointmentRoutes = require("./routes/appointment.routes");
app.use("/", appointmentRoutes);

app.get("/", (req, res) => {
  console.log('querying appointments from app.js');
  Appointment.find().exec((err, appointments) => {
    if(err) {
      res.json('Something went wrong');
    } else {
      res.render('index', {
        title: "Home page",
        appointments: appointments
      });
    }
  });
});

const PORT = process.env.PORT || 5000;

// Starting a server
app.listen(PORT, () => {
  console.log(`app is running at ${PORT}`);
});