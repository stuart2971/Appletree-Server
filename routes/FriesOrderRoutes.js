const router = require("express").Router()
const Fries = require("../models/Fries.model")

//Show all Orders
router.route("/show").get((req, res) => {
    Fries.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json("Error: ", err))
})
 
//Add an order
router.route("/add").post((req, res) => { 
    let newOrder = new Fries({
        name: req.body.name,
        price: req.body.price,
        address: req.body.address,
        friesType: req.body.friesType,
        spice: req.body.spice,
        phoneNumber: req.body.phoneNumber,
        date: req.body.date,
        imageProfileNumber: Math.floor(Math.random() * 14),
        takeout: req.body.takeout
    })
    newOrder.save()
        .then(() => res.json("Order added")) 
        .catch(err => res.status(400).json({err}))
})

//Remove an order
router.route("/remove/:id").delete((req, res) => {
    Fries.deleteOne({ _id: req.params.id })
        .then(() => res.json("Deleted Successfully"))
        .catch(err => res.status(400).json("Error: ", err))
})

//Update an order (mark as complete)
router.route("/update/:id").put((req, res) => {
    Fries.updateOne({
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
