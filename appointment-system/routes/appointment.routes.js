const express = require("express");
const router = express.Router();
// const multer = require('multer');

// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//   }
// });

// var upload = multer({
//   storage: storage
// }).single('image');

const {
  addAppointment,
  deleteAppointmentById,
  sendAppointmentDataByIdToEditView,
  updateAppointment,
  getAppointmentsByPatientsId,
  getAppointmentsByHealthcareProviderWalletAddress,
} = require("../controllers/appointment.controller");

router.get("/addAppointment", (req, res) => {
  res.render("add_appointment", { title: "Add Appointment" });
});

router.post("/addAppointment", addAppointment);

router.get("/editAppointment/:id", sendAppointmentDataByIdToEditView);

router.post("/editAppointment/:id", updateAppointment);

router.get("/deleteAppointment/:id", deleteAppointmentById);

router.get(
  "/getAppointmentsByPatients/:PatientId",
  getAppointmentsByPatientsId
);
router.get(
  "/getAppointmentsByHCP/:hcpAddress",
  getAppointmentsByHealthcareProviderWalletAddress
);

module.exports = router;
