const express = require("express");
const router = express.Router();
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator')
var path = require('path');
const { User, DailyPokemon, PlayerAdvancement, UserProfil } = require('./Schema');
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

router.post("/register",
  // Express Validator middleware
  [
    body('pseudo').trim().notEmpty().withMessage('Le pseudo est requis'),
    body('email').trim().isEmail().withMessage('Veuillez entrer un email valide'),
    body('password').trim().isLength({ min: 8 }).withMessage('Le mot de passe doit comporter au moins 8 caractères'),
    body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/).withMessage('Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial'),
  ], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passes, proceed with registration
    const { pseudo, email, password } = req.body;
    try {
      if (!pseudo || !email || !password) {
        throw new Error("Missing required fields");
      }
      const salt = await bcrypt.genSalt();
      const encryptedPassword = await bcrypt.hash(password, salt);
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

      const userProfil = await UserProfil.create({
        userId: newUser._id,
        pseudo: newUser.pseudo,
        bestRank: 0,
        title: 'Débutant',
        classicScore: 0,
        silouhetteScore: 0,
        descriptionScore: 0,
        totalScore: 0,
      });

      const pAdvancement = await PlayerAdvancement.create({
        userId: newUser._id,
        game1Advancement: [], game1Bool: false, game1score: 0,
        game2Advancement: [], game2Bool: false, game2score: 0,
        game3Advancement: [], game3Bool: false, game3score: 0,
      });

      console.log("user creasted successfully");
      res.status(201).json({ status: "Ok" });
    } catch (error) {
      console.error("Error registering user:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }


  });


router.post("/login",
  // Express Validator middleware
  [
    body('email').trim().isEmail().withMessage('Veuillez entrer un email valide'),
    body('password').trim().isLength({ min: 8 }).withMessage('Le mot de passe doit comporter au moins 8 caractères'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
      const user = await User.findOne({ email: email });
      //console.log('comparison result:', user);
      if (!user) { return res.json({ error: "User Not found" }); }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ status: "error", error: "InvAlid Password" });
      }
      const token = jwt.sign({ email: user.email }, process.env.JWT_Secret, {
        expiresIn: "15m",
      });
      console.log('connexion successful');
      return res.status(200).json({ status: "ok", data: { token: token, userId: user._id } });
    } catch (error) {
      console.error('Error in login route:', error);
      return res.status(500).json({ error: error.message });
    }
  });


router.post("/forgot-password",
  // Express Validator middleware
  [
    body('email').trim().isEmail().withMessage('Veuillez entrer un email valide'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
      }
      const secret = process.env.JWT_Secret + oldUser.password;
      const token = jwt.sign({ email: oldUser.email, }, secret, {
        expiresIn: "10m",
      });
      // Store the reset token in the database
      const resetToken = new ResetToken({
      userId: oldUser._id,
      token,
      expires: Date.now() + 600000, // Token expires in 10 minutes
      });
      const link = `https://pokezapserver.vercel.app/reset-password/${oldUser._id}/${token}`;
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME, //oldUser.email
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      var mailOptions = {
        from: "noreply@gmail.com",
        to: email,
        subject: "Password Reset",
        text:
        `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link to reset your password:\n\n` +
        `${link}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      console.log(link);
    } catch (error) { }
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
router.post("/reset-password",
  // Express Validator middleware
  [
    body('password').trim().isLength({ min: 8 }).withMessage('Le mot de passe doit comporter au moins 8 caractères'),
    body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/).withMessage('Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId, token, password } = req.body;

    const oldUser = await User.findOne({ _id: userId });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = process.env.JWT_Secret + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      const salt = await bcrypt.genSalt();
      const encryptedPassword = await bcrypt.hash(password, salt);
      await User.updateOne(
        {
          _id: userId,
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
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_Secret);
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
    } catch (error) {
      // If the token is not valid, send an error response
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    // If there's no Authorization header, send an error response
    res.status(401).json({ message: 'No token provided' });
  }
});

// Route pour récupérer la liste userProfil
router.get('/userProfil/:userId', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_Secret);
      try {
        // Get the user's ID from the route parameters
        const { userId } = req.params;

        // Find the PlayerAdvancement document for this user
        const userProfilDoc = await UserProfil.findOne({ userId });

        // Check if the document exists and if it contains the game1Advancement property
        if (userProfilDoc) {
          // Return the game1Advancement list
          res.json(userProfilDoc);
        } else {
          // If the game1Advancement property is not defined or if the document does not exist, return an empty list
          res.json([]);
        }
      } catch (error) {
        // Handle errors
        console.error("Error retrieving the game1Advancement list:", error);
        res.status(500).json({ error: 'Error retrieving the game1Advancement list' });
      }
    } catch (error) {
      // If the token is not valid, send an error response
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    // If there's no Authorization header, send an error response
    res.status(401).json({ message: 'No token provided' });
  }
});

// Route pour récupérer la liste gameAdvancement
router.get('/gameAdvancement/:userId', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_Secret);
      try {
        // Get the user's ID from the route parameters
        const { userId } = req.params;

        // Find the PlayerAdvancement document for this user
        const playerAdvancementDoc = await PlayerAdvancement.findOne({ userId });

        // Check if the document exists and if it contains the game1Advancement property
        if (playerAdvancementDoc) {
          // Return the game1Advancement list
          res.json(playerAdvancementDoc);
        } else {
          // If the game1Advancement property is not defined or if the document does not exist, return an empty list
          res.json([]);
        }
      } catch (error) {
        // Handle errors
        console.error("Error retrieving the game1Advancement list:", error);
        res.status(500).json({ error: 'Error retrieving the game1Advancement list' });
      }
    } catch (error) {
      // If the token is not valid, send an error response
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    // If there's no Authorization header, send an error response
    res.status(401).json({ message: 'No token provided' });
  }
});

// Route pour ajouter un élément à la liste game1Advancement
router.post('/game1Advancement/add/:userId', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_Secret);
      try {
        const userId = req.params.userId;
        // Récupérer l'élément à ajouter de la requête POST
        const newItem = req.body.newItem;

        // Vérifier si l'élément est une chaîne valide
        if (typeof newItem !== 'string') {
          return res.status(400).json({ error: 'L\'élément à ajouter doit être une chaîne de caractères' });
        }

        // Mettre à jour la liste game1Advancement dans la base de données en ajoutant le nouvel élément
        const playerAdvancementDoc = await PlayerAdvancement.findOne({ userId: userId });
        if (playerAdvancementDoc) {
          playerAdvancementDoc.game1Advancement.push(newItem);
          await playerAdvancementDoc.save();
          return res.json({ message: 'Élément ajouté avec succès à la liste game1Advancement pour l\'utilisateur avec ID: ' + userId });
        } else {
          return res.status(404).json({ error: 'Document playerAdvancement introuvable pour l\'utilisateur avec ID: ' + userId });
        }
      } catch (error) {
        // Gérer les erreurs
        console.error("Erreur lors de l'ajout d'un élément à la liste game1Advancement :", error);
        return res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'élément à la liste game1Advancement' });
      }
    } catch (error) {
      // If the token is not valid, send an error response
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    // If there's no Authorization header, send an error response
    res.status(401).json({ message: 'No token provided' });
  }
});

// Route pour récupérer le score du joueur et mettre à jour le score dans la table playeradvancement sur le tuple game1score
router.post('/update-game1score/add/:userId', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_Secret);
      try {
        const userId = req.params.userId;

        // Récupérer le score à mettre à jour de la requête POST
        const newItem = parseInt(req.body.newItem, 10);

        // Vérifier si le score est un nombre valide
        if (typeof newItem !== 'number') {
          return res.status(400).json({ error: `Le score à mettre à jour doit être un nombre, mais le type fourni est : ${typeof newItem}` });
        }


        // Mettre à jour le score game1score dans la table playeradvancement dans la base de données
        const playerAdvancementDoc = await PlayerAdvancement.findOne({ userId: userId });
        if (playerAdvancementDoc) {
          playerAdvancementDoc.game1score = newItem;
          playerAdvancementDoc.game1Bool = true;
          await playerAdvancementDoc.save();
          return res.json({ message: 'Score mis à jour avec succès pour l\'utilisateur avec ID: ' + userId });
        } else {
          return res.status(404).json({ error: 'Document playerAdvancement introuvable pour l\'utilisateur avec ID: ' + userId });
        }
      } catch (error) {
        // Gérer les erreurs
        console.error("Erreur lors de la mise à jour du score game1score :", error);
        return res.status(500).json({ error: 'Erreur lors de la mise à jour du score game1score' });
      }
    } catch (error) {
      // If the token is not valid, send an error response
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    // If there's no Authorization header, send an error response
    res.status(401).json({ message: 'No token provided' });
  }
});

// Route pour ajouter un élément à la liste game2Advancement
router.post('/game2Advancement/add/:userId', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_Secret);
      try {
        const userId = req.params.userId;
        // Récupérer l'élément à ajouter de la requête POST
        const newItem = req.body.newItem;

        // Vérifier si l'élément est une chaîne valide
        if (typeof newItem !== 'string') {
          return res.status(400).json({ error: 'L\'élément à ajouter doit être une chaîne de caractères' });
        }

        // Mettre à jour la liste game1Advancement dans la base de données en ajoutant le nouvel élément
        const playerAdvancementDoc = await PlayerAdvancement.findOne({ userId: userId });
        if (playerAdvancementDoc) {
          playerAdvancementDoc.game2Advancement.push(newItem);
          await playerAdvancementDoc.save();
          return res.json({ message: 'Élément ajouté avec succès à la liste game2Advancement pour l\'utilisateur avec ID: ' + userId });
        } else {
          return res.status(404).json({ error: 'Document playerAdvancement introuvable pour l\'utilisateur avec ID: ' + userId });
        }
      } catch (error) {
        // Gérer les erreurs
        console.error("Erreur lors de l'ajout d'un élément à la liste game1Advancement :", error);
        return res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'élément à la liste game1Advancement' });
      }
    } catch (error) {
      // If the token is not valid, send an error response
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    // If there's no Authorization header, send an error response
    res.status(401).json({ message: 'No token provided' });
  }
});



// Route pour récupérer le score du joueur et mettre à jour le score dans la table playeradvancement sur le tuple game1score
router.post('/update-game2score/add/:userId', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_Secret);
      try {
        const userId = req.params.userId;

        // Récupérer le score à mettre à jour de la requête POST
        const newItem = parseInt(req.body.newItem, 10);

        // Vérifier si le score est un nombre valide
        if (typeof newItem !== 'number') {
          return res.status(400).json({ error: `Le score à mettre à jour doit être un nombre, mais le type fourni est : ${typeof newItem}` });
        }


        // Mettre à jour le score game1score dans la table playeradvancement dans la base de données
        const playerAdvancementDoc = await PlayerAdvancement.findOne({ userId: userId });
        if (playerAdvancementDoc) {
          playerAdvancementDoc.game2score = newItem;
          playerAdvancementDoc.game2Bool = true;
          await playerAdvancementDoc.save();
          return res.json({ message: 'Score mis à jour avec succès pour l\'utilisateur avec ID: ' + userId });
        } else {
          return res.status(404).json({ error: 'Document playerAdvancement introuvable pour l\'utilisateur avec ID: ' + userId });
        }
      } catch (error) {
        // Gérer les erreurs
        console.error("Erreur lors de la mise à jour du score game1score :", error);
        return res.status(500).json({ error: 'Erreur lors de la mise à jour du score game1score' });
      }
    } catch (error) {
      // If the token is not valid, send an error response
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    // If there's no Authorization header, send an error response
    res.status(401).json({ message: 'No token provided' });
  }
});

// Route pour ajouter un élément à la liste game1Advancement
router.post('/game3Advancement/add/:userId', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_Secret);
      try {
        const userId = req.params.userId;
        // Récupérer l'élément à ajouter de la requête POST
        const newItem = req.body.newItem;

        // Vérifier si l'élément est une chaîne valide
        if (typeof newItem !== 'string') {
          return res.status(400).json({ error: 'L\'élément à ajouter doit être une chaîne de caractères' });
        }

        // Mettre à jour la liste game1Advancement dans la base de données en ajoutant le nouvel élément
        const playerAdvancementDoc = await PlayerAdvancement.findOne({ userId: userId });
        if (playerAdvancementDoc) {
          playerAdvancementDoc.game3Advancement.push(newItem);
          await playerAdvancementDoc.save();
          return res.json({ message: 'Élément ajouté avec succès à la liste game3Advancement pour l\'utilisateur avec ID: ' + userId });
        } else {
          return res.status(404).json({ error: 'Document playerAdvancement introuvable pour l\'utilisateur avec ID: ' + userId });
        }
      } catch (error) {
        // Gérer les erreurs
        console.error("Erreur lors de l'ajout d'un élément à la liste game3Advancement :", error);
        return res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'élément à la liste game3Advancement' });
      }
    } catch (error) {
      // If the token is not valid, send an error response
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    // If there's no Authorization header, send an error response
    res.status(401).json({ message: 'No token provided' });
  }
});

// Route pour récupérer le score du joueur et mettre à jour le score dans la table playeradvancement sur le tuple game1score
router.post('/update-game3score/add/:userId', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_Secret);
      try {
        const userId = req.params.userId;

        // Récupérer le score à mettre à jour de la requête POST
        const newItem = parseInt(req.body.newItem, 10);

        // Vérifier si le score est un nombre valide
        if (typeof newItem !== 'number') {
          return res.status(400).json({ error: `Le score à mettre à jour doit être un nombre, mais le type fourni est : ${typeof newItem}` });
        }


        // Mettre à jour le score game1score dans la table playeradvancement dans la base de données
        const playerAdvancementDoc = await PlayerAdvancement.findOne({ userId: userId });
        if (playerAdvancementDoc) {
          playerAdvancementDoc.game3score = newItem;
          playerAdvancementDoc.game3Bool = true;
          await playerAdvancementDoc.save();
          return res.json({ message: 'Score mis à jour avec succès pour l\'utilisateur avec ID: ' + userId });
        } else {
          return res.status(404).json({ error: 'Document playerAdvancement introuvable pour l\'utilisateur avec ID: ' + userId });
        }
      } catch (error) {
        // Gérer les erreurs
        console.error("Erreur lors de la mise à jour du score game1score :", error);
        return res.status(500).json({ error: 'Erreur lors de la mise à jour du score game1score' });
      }
    } catch (error) {
      // If the token is not valid, send an error response
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    // If there's no Authorization header, send an error response
    res.status(401).json({ message: 'No token provided' });
  }
});
module.exports = router;