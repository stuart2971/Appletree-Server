const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const Pusher = require("pusher");

const SandwichRouter = require("./routes/SandwichOrderRoutes")
const FriesRouter = require("./routes/FriesOrderRoutes")

require("dotenv").config();

const app = express();

const stripe = require("stripe")(process.env.SECRET_KEY);

app.use(cors());
app.use(express.static("."));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/favicon.ico', (req, res) => res.status(204));
app.get("/", (req, res) => res.status(200))

app.post("/payment", async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.price,
      currency: "cad"
    });
    res.send({
      clientSecret: paymentIntent.client_secret
    });
});

//Apple pay costs $119 annually.  When verifying domain with apple, you need a developer account which costs money.  
//Only implement if website makes a lot of $$$
// app.use("/.well-known/apple-developer-merchantid-domain-association", express.static(__dirname + "/certificates/apple-developer-merchantid-domain-association"))

app.use("/sandwich", SandwichRouter)
app.use("/fries", FriesRouter)


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

mongoose.connect(process.env.MONGO_CONNECTION, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true})
const db = mongoose.connection;

var pusher = new Pusher({
    appId: '998256',
    key: 'bebb9d52f8b135fdd6d0',
    secret: '478101aec42810662476',
    cluster: 'us2',
    useTLS: true
});

db.once("open", () => {
    console.log("Connected to db")
    
    app.listen(process.env.PORT || 3000, () => {
        console.log("Listening on port 3000");
    });

    const sandwichStream = db.collection('sandwiches').watch();

    sandwichStream.on('change', (change) => {
        //change.operationType depends on what change was made to the db
        pusher.trigger('sandwichChange', change.operationType, {
            _id: change.documentKey._id,
            changeData: change.updateDescription,
            insertData: change.fullDocument
        });
    });

    const FriesStream = db.collection('fries').watch();

    FriesStream.on('change', (change) => {
        //change.operationType depends on what change was made to the db
        pusher.trigger('friesChange', change.operationType, {
            _id: change.documentKey._id,
            changeData: change.updateDescription,
            insertData: change.fullDocument
        });
    });
})