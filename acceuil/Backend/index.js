const express = require("express");
const app = express(); // Initialisation de l'application Express
require("dotenv").config();
const { default: mongoose } = require("mongoose");
//const bodyParser = require('body-parser');
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');
var path = require('path');
//const User = require('./Schema');
const { User, DailyPokemon, PlayerAdvancement } = require('./Schema');
const Router = require('./Routes');
const cron = require('node-cron');
const pokemonData = require('../src/Composants/assets/datas/FR_EN_PokeDict.json');


// Initialisation de app


// Configuration du moteur de vue (ejs)
app.set("view engine", "ejs");

// Middleware pour parser les requêtes JSON
//app.use(bodyParser.json());
app.use(express.json());
// Middleware pour autoriser les requêtes cross-origin (CORS)
app.use(cors());

// Middleware pour parser les données urlencoded
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
// Routes
app.use('/',Router);

mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.error("Database connection error:", e)); // Log database connection error

/*const userSchema = new mongoose.Schema({
    pseudo: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
});*/
/*const dailyPokemon = new DailyPokemon({
  pokemon1: 'Pikachu',
  pokemon2: 'Charizard',
  pokemon3: 'Bulbasaur',
  pokemon4: 'Squirtle'
});
dailyPokemon.save()
.then(() => console.log('User saved successfully'))
.catch(err => console.error('Error saving user:', err));*/

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Fonction pour récupérer 4 Pokémons aléatoires avec leurs noms anglais à partir du fichier JSON
function getRandomPokemons() {
  const pokemonNames = Object.keys(pokemonData);
  const randomPokemons = [];

  while (randomPokemons.length < 4) {
    const randomIndex = Math.floor(Math.random() * pokemonNames.length);
    const pokemonName = pokemonNames[randomIndex];
    const englishName = pokemonData[pokemonName];
    console.log(englishName);
    randomPokemons.push(englishName);
    // Supprimer le Pokémon sélectionné pour éviter les doublons
    pokemonNames.splice(randomIndex, 1);
  }

  return randomPokemons;
}

async function insertDailyPokemons() {
  try {
    const selectedPokemons = getRandomPokemons();
    // Insertion dans la collection MongoDB spécifiée
    const dailyPokemon = new DailyPokemon({
    pokemon1: selectedPokemons[0],
    pokemon2: selectedPokemons[1],
    pokemon3: selectedPokemons[2],
    pokemon4: selectedPokemons[3],
    });
    dailyPokemon.save();
    console.log('Daily Pokémons inserted successfully.');
  } catch (error) {
    console.error('Error inserting daily Pokémons:', error);
  }
}

// Planification de l'exécution quotidienne à minuit
cron.schedule('0 22 * * *', () => {
  //insertDailyPokemons();
});
