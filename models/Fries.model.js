const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    friesType: {
        type: String,
        required: true
    },
    spice: {
        type: String,
        required: true
    },
    mayoType: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    imageProfileNumber: {
        type: Number,
        required:true
    },
    takeout: {
        type: Boolean,
        required: true
    },
    isCompleted: {
        type:Boolean,
        default: false
    },
    email: {
        type: String,
        required: false
    }
})


module.exports = mongoose.model("Fries", orderSchema)