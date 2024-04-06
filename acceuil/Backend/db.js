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
const User = require('./Schema');
const Router = require('./Routes');

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
app.get('/', (req, res) => res.status(200).send('Server is running!'));

//const JWT_SECRET = "jdhjjsssshjnqkjgftzksbvhjqn{}]\ndbdk,l";
//const mongoUrl = "mongodb+srv://asma:SCI123@cluster0.nuo1d42.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
})
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.error("Database connection error:", e)); // Log database connection error

/*const userSchema = new mongoose.Schema({
    pseudo: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
});
const User = mongoose.model("User", userSchema);*/
/*const user = new User({
  pseudo: 'test',
  email: 'test@example.com',
  password: 'password123',
});

user.save()
  .then(() => console.log('User saved successfully'))
  .catch(err => console.error('Error saving user:', err));*/

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});