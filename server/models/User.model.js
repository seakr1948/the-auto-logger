const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Vehicle = require('./Vehicle.model');

const userSchema = Schema({
    email: String,
    username: String,
    password: String,
    vehicles: [{
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
    }]
})

userSchema.pre('save', async function (next) {
    if (this.isNew) {
        console.log("New Doc");
        const user = this;
        const hash = await bcrypt.hash(user.password, 12);
        user.password = hash;
        console.log(user);
        next();
    } else {
        console.log("Nothing to save");
        next();
    }

})

const User = mongoose.model('User', userSchema);

module.exports = User;