// server/index.js
// Consts
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3001;
const BASE_URL = '/api';
// Imports
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
let loc = require('list-of-cars');
loc.getListSync();
let list = loc.getCarsByMakeObj();

// Models
const Vehicle = require('./models/Vehicle.model');
const User = require('./models/User.model');
const FuelLog = require('./models/FuelLog.model');
const Message = require('./models/Message.model');
const { generateAccessToken, validateToken } = require('../client/src/middleware/Validation');

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


// Routes
app.post("/register", async (req, res) => {
    console.log("Registering User");
    const { username } = req.body;
    User.findOne({ username }, async (err, doc) => {
        if (err) throw err;
        console.log(doc);
        if (doc) {
            console.log("User already exists")
            return res.send("User already exists")
        }
        if (!doc) {
            const newUser = User(req.body);
            await newUser.save();
            return res.send("New User Created");
        }
    })
})

app.post(BASE_URL + "/login", async (req, res, next) => {
    const { username, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ username });
    console.log(user.password, password)
    const result = await bcrypt.compare(password, user.password);
    console.log(result)
    if (result) {
        console.log("Logged In");
        const token = generateAccessToken(user.username);
        res.json({
            token: `Bearer ${token}`
        })
    } else {
        console.log("Wrong Username/Password");
        res.status(401).json("Username/Password Invalid")
    }

})

app.get("/user", (req, res) => {
    console.log(req.user);
    res.send(req.user);
})

app.get(BASE_URL + "/carlist", async (req, res) => {
    const makelist = await loc.getCarMakes();
    res.json({
        make_list: makelist
    })
})

app.get(BASE_URL + "/getmake", async (req, res) => {

    let { year, make } = req.query;
    year = parseInt(year);
    if (year !== '' && make !== '') {


        const filtered = list[make].filter((element) => {
            return element.Year === year
        })
        res.send(filtered);
    } else {
        res.send([])
    }

})

app.get(BASE_URL + '/vehicles', validateToken, async (req, res) => {
    console.log("Getting vehicles");
    const { username } = req.tokenData
    const user = await User.findOne({ username }).populate('vehicles')
    console.log(user.vehicles)
    res.json(user.vehicles);
})

app.get(BASE_URL + '/vehicles/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const result = await Vehicle.findById(id).populate('fuel_logs');
    res.json(result);
})

app.delete(BASE_URL + '/vehicles/:id', validateToken, async (req, res) => {
    const { username } = req.tokenData;

    const { id } = req.params;
    console.log(id)
    const user = await User.updateOne({ username: username },
        {
            $pull: {
                vehicles: id
            }
        });
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    res.json("Vehicle Deleted!");
})

app.post(BASE_URL + '/vehicles/:id/fuellogs/new', validateToken, async (req, res) => {
    const { id } = req.params;

    const newFuelLog = FuelLog(req.body);
    await newFuelLog.save();

    await Vehicle.findOneAndUpdate({ _id: id },
        {
            $push: {
                "fuel_logs": { $each: [newFuelLog.id], $position: 0 }
            }
        },
        {
            new: true,
        });
    res.send("Fuel log saved");
})

app.get(BASE_URL + '/vehicles/:id/fuellogs/:log_id', validateToken, async (req, res) => {
    const { log_id } = req.params;
    const fuellog = await FuelLog.findById(log_id);
    res.send(fuellog)
})

app.patch(BASE_URL + '/vehicles/:id/fuellogs/:log_id', validateToken, async (req, res) => {
    const { log_id } = req.params;
    const fuellog = await FuelLog.findByIdAndUpdate(log_id, req.body);
    console.log(fuellog);
    res.send("Fuel Log Editted")
})

app.delete(BASE_URL + '/vehicles/:id/fuellogs/:log_id', validateToken, async (req, res) => {
    const { id, log_id } = req.params;
    console.log(id, log_id);
    await Vehicle.updateOne({ _id: id }, {
        $pull: {
            fuel_logs: log_id
        }
    })
    await FuelLog.findByIdAndDelete(log_id);
    res.json("Fuel Log Deleted")
})

app.post(BASE_URL + '/vehicles/new', validateToken, async (req, res) => {
    const { username } = (req.tokenData);
    const currentUser = await User.findOne({ username });

    const newVehicle = Vehicle(req.body);
    await newVehicle.save();

    currentUser.vehicles.push(newVehicle.id);
    currentUser.save();
    res.json("New Vehicle Saved");
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})
