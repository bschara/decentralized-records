const Appointment = require("../models/appointment.model");
// const fs = require('fs');

exports.addAppointment = (req, res) => {
  const body = req.body;
  if (
    !body.hcpWalletAddress ||
    !body.date ||
    !body.place ||
    !body.patientWalletAddress
  ) {
    console.log(body.hcpWalletAddress);
    return res.status(422).json({
      status: 422,
      appointment: {
        hcpWalletAddress: "Healthcare provider wallet address is required",
        date: "Date is required",
        place: "Place is required",
        patientWalletAddress: "Patient wallet address is required",
      },
    });
  }
  const appointment = new Appointment({
    hcpWalletAddress: body.hcpWalletAddress,
    date: body.date,
    place: body.place,
    patientWalletAddress: body.patientWalletAddress,
    healthcareProfessional: body.healthcareProfessional,
  });
  appointment.save((err) => {
    let messageJSON = {
      message: "Appointment added successfully!",
      type: "success",
    };
    if (err) {
      messageJSON.message = err.message;
      messageJSON.type = "danger";
      res.json(messageJSON);
    } else {
      console.log(messageJSON);
      res.redirect("/");
    }
  });
};

exports.getAppointmentsByPatientsId = (req, res) => {
  const patientId = req.params.PatientId;
  console.log("req.params:", req.params); // Log the entire params object
  console.log("Received patient ID:", patientId);

  // Using the correct field name for patient ID
  Appointment.find({ patientWalletAddress: patientId })
    .then((appointments) => {
      console.log("Appointments found:", appointments);
      res.json(appointments);
    })
    .catch((error) => {
      console.error("Error fetching appointments by patient ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

// Function to get appointments by healthcare provider wallet address
exports.getAppointmentsByHealthcareProviderWalletAddress = (req, res) => {
  const hcpWalletAddress = req.params.hcpAddress;

  // Using the standard find method
  Appointment.find({ hcpWalletAddress: hcpWalletAddress })
    .then((appointments) => {
      res.json(appointments);
    })
    .catch((error) => {
      console.error(
        "Error fetching appointments by healthcare provider wallet address:",
        error
      );
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.sendAppointmentDataByIdToEditView = (req, res) => {
  const id = req.params.id;
  Appointment.findById(id, (err, appointment) => {
    if (err) {
      res.redirect("/");
    } else {
      if (appointment == null) {
        res.redirect("/");
      } else {
        res.render("edit_appointment", {
          title: "Edit appointment",
          appointment: appointment,
        });
      }
    }
  });
};

exports.updateAppointment = (req, res) => {
  const id = req.params.id;
  // let newImage = '';

  // if(req.file) {
  //   newImage = req.file.filename;
  //   try {
  //     fs.unlinkSync('./uploads/' + req.body.old_image);
  //   } catch(err) {
  //     console.log(err);
  //   }
  // } else {
  //   newImage = req.body.old_image;
  // }

  Appointment.findByIdAndUpdate(
    id,
    {
      hcpWalletAddress: req.body.hcpWalletAddress,
      date: req.body.date,
      place: req.body.place,
      patientWalletAddress: req.body.patientWalletAddress,
      healthcareProfessional: req.body.healthcareProfessional,
    },
    (err, result) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        console.log("User updated successfully!");
        console.log(id);
        res.redirect("/");
      }
    }
  );
};

exports.deleteAppointmentById = (req, res) => {
  const id = req.params.id;
  Appointment.findByIdAndRemove(id, (err, result) => {
    // if(result.image != '') {
    //   try {
    //     fs.unlinkSync('./uploads/' + result.image);
    //   } catch(err) {
    //     console.log(err);
    //   }
    // }
    if (err) {
      res.json({ message: err.message });
    } else {
      console.log("Successfull Deletion");
    }
    res.redirect("/");
  });
};
