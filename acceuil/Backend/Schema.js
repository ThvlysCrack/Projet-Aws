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
        validate: {
            validator: function(value) {
                // Vérifie si l'email est au bon format
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Please add a valid email'
        }

    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        validate: {
            validator: function(password) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
            },
            message: 'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, and must be at least 8 characters long'
        }
    },
}, { timestamps: true })

const userProfilSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'L\'ID de l\'utilisateur est requis']
    },
    pseudo: {
        type: String,
        ref: 'User',
        required: [true, 'L\'ID de l\'utilisateur est requis']
    },
    bestRank: {
        type: Number,
        default: 0, 
        trim: true
    },
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        default: 'Débutant'
    },
    classicScore: {
        type: Number, 
        default: 0,
    },
    silouhetteScore: {
        type: Number, 
        default: 0,
    },
    descriptionScore: {
        type: Number, 
        default: 0,
    },
    totalScore: {
        type: Number, 
        default: 0, 
    }
}, { timestamps: true})

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
    game1score: {
        type: Number,
        default:0,
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
    game2score: {
        type: Number,
        default:0,
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
    game3score: {
        type: Number,
        default:0,
    },    
}, { timestamps: true })

const ResetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  token: {
    type: String,
    required: true
  },
  expires: {
    type: Date,
    default: Date.now() + 3600000 // Token expires in 1 hour
  }
});

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
    UserProfil: mongoose.model('user-profils', userProfilSchema),
    DailyPokemon: mongoose.model('daily-pokemons', dailyPokemonSchema),
    PlayerAdvancement: mongoose.model('player-advancements', playerAdvancementSchema),
    ResetToken: mongoose.model('ResetToken',ResetTokenSchema),
  };