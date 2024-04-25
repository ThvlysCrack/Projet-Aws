const express = require("express");
const router = express.Router();
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');
var path = require('path');
const { User, DailyPokemon, PlayerAdvancement } = require('./Schema');
const { appendFile } = require("fs");

router.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              text-align: center;
              padding: 50px;
          }
          h1 {
              color: #333;
              font-size: 3em;
              margin-bottom: 20px;
          }
          p {
              color: #666;
              font-size: 1.5em;
          }
      </style>
  </head>
  <body>
        <h1>Welcome to PokeZap Backend Server!</h1>
        <p>This is a server-side root route handler.</p>
  </body>
  </html>
`);
});

router.post("/register", async (req, res) => {
  const { pseudo, email, password } = req.body;
  
  try {
    if (!pseudo || !email || !password) {
      throw new Error("Missing required fields");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      console.log("User already exists");
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = await User.create({
      pseudo,
      email,
      password: encryptedPassword,
    });

    const pAdvancement = await PlayerAdvancement.create({
      userId: newUser._id,
      game1Advancement: [], game1Bool: false,
      game2Advancement: [], game2Bool: false,
      game3Advancement: [], game3Bool: false,
      game4Advancement: [], game4Bool: false,
      });
    console.log("user creasted successfully");
    res.status(201).json({ status: "Ok" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }

   
});


router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, process.env.JWT_Secret, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: { token: token, userId: user._id }  });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});


router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'No user exists with that email' });
  }

  // Generate a random token
  const token = crypto.randomBytes(20).toString('hex');

  // Store the token and the expiration time in the user's document
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
  await user.save();

  // Send an email to the user with the token
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Password Reset',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\nhttp://localhost:3000/reset-password?token=${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  await transporter.sendMail(mailOptions);

  res.status(200).json({ message: 'Password reset email sent' });
});


router.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.JWT_Secret + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});
router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.JWT_Secret + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

router.get('/daily-pokemons', async (req, res) => {
  try {
    // Récupérer les 4 Pokémons du jour
    const dailyPokemons = await DailyPokemon.findOne({}, {}, { sort: { 'createdAt': -1 } });
    if (dailyPokemons) {
      res.status(200).json(dailyPokemons);
    } else {
      res.status(404).json({ message: "Aucun Pokémon trouvé pour aujourd'hui." });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des Pokémons du jour :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route pour récupérer la liste game1Advancement
router.get('/game1Advancement', async (req, res) => {
  try {
      // Récupérer le document playerAdvancement
      const playerAdvancementDoc = await PlayerAdvancement.findOne();
      
      // Vérifier si le document existe et s'il contient la propriété game1Advancement
      if (playerAdvancementDoc && playerAdvancementDoc.game1Advancement) {
          // Retourner la liste game1Advancement
          res.json(playerAdvancementDoc.game1Advancement);
      } else {
          // Si la propriété game1Advancement n'est pas définie ou si le document n'existe pas, retourner une liste vide
          res.json([]);
      }
  } catch (error) {
      // Gérer les erreurs
      console.error("Erreur lors de la récupération de la liste game1Advancement :", error);
      res.status(500).json({ error: 'Erreur lors de la récupération de la liste game1Advancement' });
  }
});

// Route pour ajouter un élément à la liste game1Advancement
router.post('/game1Advancement/add', async (req, res) => {
  try {
      // Récupérer l'élément à ajouter de la requête POST
      const newItem = req.body.newItem;

      // Vérifier si l'élément est une chaîne valide
      if (typeof newItem !== 'string') {
          return res.status(400).json({ error: 'L\'élément à ajouter doit être une chaîne de caractères' });
      }

      // Mettre à jour la liste game1Advancement dans la base de données en ajoutant le nouvel élément
      const playerAdvancementDoc = await PlayerAdvancement.findOne();
      if (playerAdvancementDoc) {
          playerAdvancementDoc.game1Advancement.push(newItem);
          await playerAdvancementDoc.save();
          return res.json({ message: 'Élément ajouté avec succès à la liste game1Advancement' });
      } else {
          return res.status(404).json({ error: 'Document playerAdvancement introuvable' });
      }
  } catch (error) {
      // Gérer les erreurs
      console.error("Erreur lors de l'ajout d'un élément à la liste game1Advancement :", error);
      return res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'élément à la liste game1Advancement' });
  }
});


module.exports = router;