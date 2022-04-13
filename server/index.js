// server/index.js
// Consts
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3001;

// Imports

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require('path');


const bcrypt = require('bcrypt');


// Models
const Vehicle = require('./models/Vehicle.model');
const User = require('./models/User.model');
const FuelLog = require('./models/FuelLog.model');
const Message = require('./models/Message.model');

// Mongoose connection
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Config
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.post("/register", async (req, res) => {
    const newUser = User(req.body);
    await newUser.save();

    res.send("User Created");
})
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username })

    console.log(password, user.password);

    const result = await bcrypt.compare(password, user.password);
    if (result) {
        res.send("Logged in");
    } else {
        res.send("Incorrect username or password");
    }

})
app.get("/user", (req, res) => {

    res.send(true);
})






app.get('/vehicles', async (req, res) => {
    console.log("Getting vehicles");
    const results = await Vehicle.find({});
    res.json(results);
})

app.get('/vehicles/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Vehicle.findById(id).populate('fuel_logs');
    res.json(result);
})
app.delete('/vehicles/:id', async (req, res) => {
    console.log("deleting vehicle")
    const { id } = req.params;
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    console.log(deletedVehicle);
    res.json("Vehicle Deleted!");
})

app.post('/vehicles/:id/fuellogs/new', async (req, res) => {
    const { id } = req.params;

    const newFuelLog = FuelLog(req.body);
    await newFuelLog.save();

    const currentVehicle = await Vehicle.findOneAndUpdate({ _id: id },
        {
            $push: {
                "fuel_logs": { $each: [newFuelLog.id], $position: 0 }
            }
        },
        {
            new: true,
        });
    console.log(currentVehicle);

    console.log(newFuelLog);

    res.send("Fuel log saved");
})

app.post('/vehicles/new', async (req, res) => {
    console.log(req.body);
    const newVehicle = Vehicle(req.body);
    await newVehicle.save();

    res.redirect("/vehicles");
})

app.get('/api', async (req, res) => {
    const findMessage = await Message.findOne({});
    const encrypted = await bcrypt.hash(findMessage.message, 12);
    const result = await bcrypt.compare(findMessage.message, encrypted);
    res.json({
        message: findMessage.message,
        encrypted: encrypted,
        result: result

    })
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})
