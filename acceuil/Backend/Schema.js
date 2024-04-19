const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({

    pseudo: {
        type: String,
        trim: true,
        required: [true, 'first name is required'],
        maxlength: 32,
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'e-mail is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'password is required'],
        minlength: [6, 'password must have at least (6) caracters'],
    },

}, { timestamps: true })

const dailyPokemonSchema = new mongoose.Schema({
    pokemon1: {
        type: String,
        trim: true,
        required: [true, 'pokemon is required']
    },
    pokemon2: {
        type: String,
        trim: true,
        required: [true, 'pokemon is required']
    },
    pokemon3: {
        type: String,
        trim: true,
        required: [true, 'pokemon is required']
    },
    pokemon4: {
        type: String,
        trim: true,
        required: [true, 'pokemon is required']
    }
}, { timestamps: true })


//encrypting password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})


// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// return a JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}


module.exports = {
    User: mongoose.model('users', userSchema),
    DailyPokemon: mongoose.model('daily-pokemons', dailyPokemonSchema),
  };