const router = require("express").Router()
const Sandwich = require("../models/Sandwich.model")

const stripe = require("stripe")("sk_test_V9Z4esZ11zDmYD5PUfIH8riz");

//Show all Orders
router.route("/show").get((req, res) => {
    Sandwich.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json("Error: ", err))
})

//Add an order
router.route("/add").post(async (req, res) => { 
    console.log("showing sandwiches")
    let newOrder = new Sandwich({
        name: req.body.name,
        price: req.body.price,
        address: req.body.address,
        sandwichType: req.body.sandwichType,
        toppings: req.body.toppings,
        spice: req.body.spice,
        cheeseType: req.body.cheeseType,
        phoneNumber: req.body.phoneNumber,
        date: req.body.date,
        imageProfileNumber: Math.floor(Math.random() * 14),
        takeout: req.body.takeout
    })

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: "usd"
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
    newOrder.save()
        .then(() => res.json("Order added")) 
        .catch(err => res.status(400).json({err}))
})

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
