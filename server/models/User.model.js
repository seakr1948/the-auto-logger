const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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
    const user = this;
    const hash = await bcrypt.hash(user.password, 12);
    user.password = hash;

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;