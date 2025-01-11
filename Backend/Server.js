import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
const app = express();
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import { error } from "console";

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

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Public", "UserLogIn.html"));
});

// POST route to handle the form submission
app.post("/login", (req, res) => {
  const { name, email, password, contact_number } = req.body;

  // SQL query to insert data into the 'users' table
  const query =
    "INSERT INTO users (name, email, password, contact_number) VALUES (?, ?, ?, ?)";
  db.query(query, [name, email, password, contact_number], (err, result) => {
    if (err) throw err;
    res.send("Account created successfully!");
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Public", "SellProperty.html"));
});

// POST route to handle the form submission
app.post("/sell-property", (req, res) => {
  const { property_id, city } = req.body;

  // SQL query to delete data into the 'users' table
  const query = "DELETE FROM Property WHERE property_id = ? AND city = ?";
  db.query(query, [property_id, city], (err, result) => {
    if (err) throw err;
    res.send("Property Sold!");
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
