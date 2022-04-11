const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fuelLogSchema = Schema({
    past_mileage: Number,
    current_mileage: Number,
    cost_per_gallon: Number,
    total_gallons: Number,
    total_price: Number,
    total_miles: Number,
    mpg: Number,
}, {
    timestamps: true,
})

const Fuel_Log = mongoose.model('FuelLog', fuelLogSchema);

module.exports = Fuel_Log;