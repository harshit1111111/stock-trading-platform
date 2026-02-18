const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require('./models/UserModel');

const { HoldingsModel } = require('./models/HoldingsModel');
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");
const User = require('./models/UserModel');

const PORT = process.env.PORT || 3001;
const uri = process.env.MONGO_URL;

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(bodyParser.json());

// --- Existing Routes ---

app.get("/allHoldings", async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    if (!name || !qty || !price || !mode) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let newOrder = new OrdersModel({
      name: name,
      qty: qty,
      price: price,
      mode: mode,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save order" });
  }
});

app.post("/login", 
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });

      if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({ 
          message: "Login successful", 
          username: user.username 
        });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.log("Login Error:", error);
      res.status(500).json({ error: "Server error during login" });
    }
  }
);

// --- Added Signup Route ---

app.post("/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(409).json({ error: "Email already registered" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ 
        username: username, 
        email: email, 
        password: hashedPassword 
      });
      
      await newUser.save();
      
      console.log(`New User: ${username}`);
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.log("Signup Error:", error);
      res.status(500).json({ error: "Error creating user. Please try again." });
    }
  }
);

// --- Database Connection ---

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB Connected successfully");
  })
  .catch(err => {
    console.log("MongoDB Connection Error:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});