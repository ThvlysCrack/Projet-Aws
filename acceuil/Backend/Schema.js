const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
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

const playerAdvancementSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'L\'ID de l\'utilisateur est requis']
        },
        game1Advancement: {
            type: [String], 
            default: [],
            trim: true
        }, 
        game1Bool: {
            type: Boolean, 
            trim: true,
            default: false
        },
        game2Advancement: {
            type: [String], 
            default: [],
            trim: true
        }, 
        game2Bool: {
            type: Boolean, 
            trim: true,
            default: false
        },
        game3Advancement: {
            type: [String], 
            default: [],
            trim: true
        }, 
        game3Bool: {
            type: Boolean, 
            trim: true,
            default: false
        },
        game4Advancement: {
            type: [String], 
            default: [],
            trim: true
        }, 
        game4Bool: {
            type: Boolean, 
            trim: true,
            default: false
        },
        
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
    PlayerAdvancement: mongoose.model('player-advancements', playerAdvancementSchema),
  };