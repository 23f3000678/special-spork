const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Simple test route
app.get("/health", (req, res) => {
  res.json({ status: "Backend running ✅" });
});

// SIGNUP route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      function (err) {
        if (err) {
          console.error(err.message);
          if (err.message.includes("UNIQUE")) {
            return res.status(400).json({ error: "Email already exists" });
          }
          return res.status(500).json({ error: "Database error" });
        }

        res.json({
          message: "Signup successful",
          user: { id: this.lastID, name, email }
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Database error" });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email }
    });
  });
});

// SAVE FAVORITE route
app.post("/favorites", (req, res) => {
  const { userId, recipeId, title, image } = req.body;

  if (!userId || !recipeId || !title) {
    return res.status(400).json({ error: "Missing fields" });
  }

  db.run(
    "INSERT OR IGNORE INTO favorites (user_id, recipe_id, title, image) VALUES (?, ?, ?, ?)",
    [userId, recipeId, title, image || null],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Recipe saved as favorite" });
    }
  );
});

// GET FAVORITES route
app.get("/favorites", (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  db.all(
    "SELECT recipe_id, title, image FROM favorites WHERE user_id = ?",
    [userId],
    (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
