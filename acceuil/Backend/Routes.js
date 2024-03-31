const express = require("express");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');
var path = require('path');
const User = require('./Schema');


app.post("/register", async (req, res) => {
    const { pseudo, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        if (!pseudo || !email || !password) {
            throw new Error("Missing required fields");
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = await User.create({
            pseudo,
            email,
            password: encryptedPassword,
        });

        res.status(201).json({ status: "Ok" });
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.post("/login", async (req, res) => {
    const { pseudo, password } = req.body;
  
    const user = await User.findOne({ pseudo });
    if (!user) {
      return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_Secret, {
        expiresIn: "15m",
      });
  
      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    }
    res.json({ status: "error", error: "InvAlid Password" });
  });
  

  app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
      }
      const secret = process.env.JWT_Secret + oldUser.password;
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
        expiresIn: "5m",
      });
      const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "aws.web2024@gmail.com", //oldUser.email
          pass: "tswvbvmlbrxwklpj",
        },
      });
  
      var mailOptions = {
        from: "noreply@gmail.com",
        to: "asma.latoui02@gmail.com",
        subject: "Password Reset",
        text: link,
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
  

  app.get("/reset-password/:id/:token", async (req, res) =>{
    const {id, token} = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({_id: id});
    if (!oldUser){
      return res.json({ status: "User Not Exists!!"});
    }
    const secret = process.env.JWT_Secret + oldUser.password;
    try{
      const verify = jwt.verify(token, secret);
      res.render("index", { email: verify.email });
    } catch (error){
      console.log(error);
      res.send("Not Verified");
    }
  });
  app.post("/reset-password/:id/:token", async (req, res) => {
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