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
    imageProfileNumber: {
        type: Number,
        required: true
    },
    takeout: {
        type: Boolean, 
        required: true
    },
    email: {
        type: String,
        required: false
    }
})
 

module.exports = mongoose.model("Sandwich", orderSchema)