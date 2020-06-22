const router = require("express").Router()
const Sandwich = require("../models/Sandwich.model")

const { sendMail } = require("./SendMail")

//Show all Orders
router.route("/show").get((req, res) => {
    Sandwich.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json("Error: ", err))
})
//Add an order
router.route("/add").post(async (req, res) => { 
    let sandwich = req.body;
    let newOrder = new Sandwich({
        name: sandwich.name,
        email: sandwich.email,
        price: sandwich.price,
        address: sandwich.address,
        sandwichType: sandwich.sandwichType,
        toppings: sandwich.toppings,
        spice: sandwich.spice,
        cheeseType: sandwich.cheeseType,
        phoneNumber: sandwich.phoneNumber,
        date: sandwich.date,
        imageProfileNumber: Math.floor(Math.random() * 14),
        takeout: sandwich.takeout
    })

    newOrder.save()
        .then(() => {
            // if(sandwich.email)
                sendMail(sandwich.email, "Hello")
        }) 
        .catch(err => res.status(400).json({err}))
})

// {
//     sandwichType: sandwich.sandwichType, 
//     cheeseType: sandwich.cheeseType,
//     spice: sandwich.spice,
//     toppings: sandwich.toppings,
//     address: sandwich.address,
//     phoneNumber: sandwich.phoneNumber,
//     price: sandwich.price
// }

//Remove an order
router.route("/remove/:id").delete((req, res) => {
    Sandwich.deleteOne({ _id: req.params.id })
        .then(() => res.json("Deleted Successfully"))
        .catch(err => res.status(400).json("Error: ", err))
})

//Update an order (mark as complete)
router.route("/update/:id").put((req, res) => {
    Sandwich.updateOne({
        _id: req.params.id
    }, { 
        $set: { 
            isCompleted: true
        }
    })
    .then(() => res.json("Updated Successfully"))
    .catch(err => res.status(400).json("Error: ", err))
})

module.exports = router
