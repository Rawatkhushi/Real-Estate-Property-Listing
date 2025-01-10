import express from "express";
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "Public")));
// Serve static files like CSS and HTML

// Database connection configuration
const db = mysql.createConnection({
  host: "localhost", // Database host
  user: "root", // MySQL username
  password: "khushi", // MySQL password
  database: "PropertyListing", // Database name
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Public", "UserLogIn.html"));
});

// POST route to handle the form submission
app.post("/login", (req, res) => {
  const { name, email, password, phone } = req.body;

  // SQL query to insert data into the 'users' table
  const query =
    "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)";
  db.query(query, [name, email, password, phone], (err, result) => {
    if (err) throw err;
    res.send("Account created successfully!");
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
