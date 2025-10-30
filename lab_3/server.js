// server.js
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// --- 1. ПІДКЛЮЧЕННЯ ДО БАЗИ ---
const dbPath = path.resolve(__dirname, "database.db");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Помилка підключення до бази:", err.message);
    } else {
        console.log("Підключено до SQLite бази");
    }
});

// --- 2. СТВОРЕННЯ ТАБЛИЦІ, якщо її ще немає ---
db.run(`
  CREATE TABLE IF NOT EXISTS shoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    price REAL,
    size INTEGER,
    color TEXT,
    image TEXT
  )
`);

// --- 3. READ ALL ---
app.get("/api/shoes", (req, res) => {
    db.all("SELECT * FROM shoes", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// --- 4. CREATE ---
app.post("/api/shoes", (req, res) => {
    const { brand, price, size, color, image } = req.body;

    if (!brand || !price || !size || !color) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const defaultImage =
        image ||
        "https://galante.com.ua/media/hotcategory/image/i/c/ice-inst_1__1.jpg";

    db.run(
        "INSERT INTO shoes (brand, price, size, color, image) VALUES (?, ?, ?, ?, ?)",
        [brand, parseFloat(price), size, color, defaultImage],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({
                id: this.lastID,
                brand,
                price: parseFloat(price),
                size,
                color,
                image: defaultImage
            });
        }
    );
});

// --- 5. UPDATE ---
app.put("/api/shoes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { brand, price, size, color, image } = req.body;

    const defaultImage =
        image ||
        "https://galante.com.ua/media/hotcategory/image/i/c/ice-inst_1__1.jpg";

    db.run(
        "UPDATE shoes SET brand=?, price=?, size=?, color=?, image=? WHERE id=?",
        [brand, parseFloat(price), size, color, defaultImage, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0)
                return res.status(404).json({ error: "Not found" });

            res.json({
                id,
                brand,
                price: parseFloat(price),
                size,
                color,
                image: defaultImage
            });
        }
    );
});

// --- 6. DELETE ---
app.delete("/api/shoes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.run("DELETE FROM shoes WHERE id = ?", id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0)
            return res.status(404).json({ error: "Not found" });
        res.json({ message: "Deleted successfully", id });
    });
});

// --- 7. ЗАПУСК СЕРВЕРА ---
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
