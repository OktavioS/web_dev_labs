const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// 1. Підключаємо базу
const dbPath = path.resolve(__dirname, "database2.db");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Помилка підключення до бази:", err.message);
    } else {
        console.log("Підключено до SQLite бази");
    }
});

// 2. Створюємо таблицю
db.run(`
    CREATE TABLE IF NOT EXISTS shoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand TEXT,
        price REAL,
        size INTEGER,
        color TEXT,
        image TEXT,
        description TEXT
    )
`);

// 3. Додаємо стартові товари, якщо таблиця пуста
db.get("SELECT COUNT(*) AS count FROM shoes", (err, row) => {
    if (err) {
        console.error("Помилка SELECT:", err.message);
        return;
    }

    if (!row || row.count === 0) {
        console.log("Таблиця пуста — додаємо стартові товари...");

        const imgURL = '/snkr.jpg';

        const defaultItems = [
            ["Nike Air Zoom", 120, 42, "Black", imgURL, "Lightweight running shoe."],
            ["Adidas Ultraboost", 150, 43, "White", imgURL, "Comfortable performance sneaker."],
            ["Puma Rider", 100, 41, "Red", imgURL, "Retro-style running shoe."],
            ["Reebok Classic", 90, 42, "Blue", imgURL, "Timeless design and durability."],
            ["New Balance 574", 130, 44, "Gray", imgURL, "Iconic casual sneaker."],
            ["Asics Gel", 110, 42, "Green", imgURL, "Superior shock absorption."]
        ];

        const sql = `
            INSERT INTO shoes (brand, price, size, color, image, description)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        defaultItems.forEach(item => db.run(sql, item));
        console.log("Стартові товари додані!");
    }
});

// 4. READ ALL з фільтрами і сортуванням
app.get("/api/shoes", (req, res) => {
    let { search, sort } = req.query;

    let sql = "SELECT * FROM shoes";
    const params = [];

    if (search) {
        sql += " WHERE brand LIKE ? OR color LIKE ?";
        params.push(`%${search}%`, `%${search}%`);
    }

    if (sort) {
        switch (sort) {
            case "priceAsc":
                sql += " ORDER BY price ASC";
                break;
            case "priceDesc":
                sql += " ORDER BY price DESC";
                break;
            case "brandAsc":
                sql += " ORDER BY brand ASC";
                break;
            case "brandDesc":
                sql += " ORDER BY brand DESC";
                break;
            default:
                break;
        }
    }

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});



// 5. CREATE
app.post("/api/shoes", (req, res) => {
    const { brand, price, size, color, image, description } = req.body;

    if (!brand || !price || !size || !color) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const img = image || "/images/snkr.jpg";

    db.run(
        "INSERT INTO shoes (brand, price, size, color, image, description) VALUES (?, ?, ?, ?, ?, ?)",
        [brand, price, size, color, img, description],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({
                id: this.lastID,
                brand,
                price,
                size,
                color,
                image: img,
                description,
            });
        }
    );
});

// 6. UPDATE
app.put("/api/shoes/:id", (req, res) => {
    const id = req.params.id;
    const { brand, price, size, color, image, description } = req.body;

    const img = image || "./public/";

    db.run(
        "UPDATE shoes SET brand=?, price=?, size=?, color=?, image=?, description=? WHERE id=?",
        [brand, price, size, color, img, description, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: "Not found" });

            res.json({
                id,
                brand,
                price,
                size,
                color,
                image: img,
                description
            });
        }
    );
});

// 7. DELETE
app.delete("/api/shoes/:id", (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM shoes WHERE id=?", id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Not found" });
        res.json({ message: "Deleted successfully", id });
    });
});

// GET ONE ITEM
app.get("/api/shoes/:id", (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM shoes WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Item not found" });
        res.json(row);
    });
});


// 8. START
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
