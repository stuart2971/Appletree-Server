const mongoose = require("mongoose")
const date = require('date-and-time');

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
        default: calcTime("-5.0")
    },
    sandwichType: {
        type: String,
        required: true
    },
    toppings: {
        type: Array,
        required: true
    },
    spice: {
        type: String,
        required: true
    },
    cheeseType: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    isCompleted: {
        type:Boolean,
        default: false
    },
    formattedDate: {
        type: String, 
        default: date.format(calcTime("-5.0"), 'hh:mm A')
    },
    imageProfileNumber: {
        type: Number,
        required: true
    },
    takeout: {
        type: Boolean, 
        required: true
    }
})
 
//Stolen from 'Sudhir Bastakoti', https://stackoverflow.com/questions/8207655/get-time-of-specific-timezone
function calcTime(offset) {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*offset));
    return nd
}

module.exports = mongoose.model("Sandwich", orderSchema)