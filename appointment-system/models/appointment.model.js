var mongoose = require("mongoose");

var appointmentSchema = new mongoose.Schema({
    hcpWalletAddress: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    place: {
        type: String,
        required: true
    },
    patientWalletAddress: {
        type: String,
        required: true
    },
    healthcareProfessional: {
        type: String,
        required: false,
        default: () => ''
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    }, 
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
}, { timestamps: true });


appointmentSchema.methods.sayHi = function() {
    console.log(`Hi my name is ${this.id}`);
}

// just returns a val; usable on the Appointment
appointmentSchema.statics.findByName = function(name) {
    return this.find({name: new RegExp(name, 'i')})
}

// chainable => used after a find or a where (a query)
appointmentSchema.query.byName = function(name) {
    return this.where({name: new RegExp(name, 'i')});
}

// a property that is not on the actual schema itself
// but its a virtual property that is based on the other properties
// this property is not saved in the db but used in the application
appointmentSchema.virtual('namedEmail').get(function() {
    return `${this.name} <${this.email}>`;
})

// do something before saving
appointmentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
})

// do something after saving
// doc instead of this
appointmentSchema.post('save', function(doc, next) {
    doc.sayHi();
    next(); // move onto the next piece of middleware
})

module.exports = mongoose.model("Appointment", appointmentSchema);
