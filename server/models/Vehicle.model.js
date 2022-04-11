const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FuelLogs = require('./FuelLog.model');

const vehicleSchema = Schema({
    make: String,
    model: String,
    year: Number,
    nickname: {
        type: String,
        default: null,
    },
    recent_mpg: {
        type: Number,
        default: 0,
    },
    best_mpg: {
        type: Number,
        default: 0,
    },
    overall_mpg: {
        type: Number,
        default: 0,
    },
    fuel_logs: [{
        type: Schema.Types.ObjectId,
        ref: 'FuelLog',
    }]
})

vehicleSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        // If deleting a vehicle, delete all fuel logs associated with it
        await FuelLogs.deleteMany({
            _id: {
                $in: doc.fuel_logs
            }
        })
    }
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;