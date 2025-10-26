// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let shoes = [];
let nextId = 1;

// --- READ ALL ---
app.get("/api/shoes", (req, res) => {
    res.json(shoes);
});

// --- CREATE ---
app.post("/api/shoes", (req, res) => {
    const { brand, price, size, color, image } = req.body;

    if (!brand || !price || !size || !color) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const newShoe = {
        id: nextId++,
        brand,
        price: parseFloat(price),
        size,
        color,
        image:
            image ||
            "https://galante.com.ua/media/hotcategory/image/i/c/ice-inst_1__1.jpg"
    };

    shoes.push(newShoe);
    res.status(201).json(newShoe);
});


// --- UPDATE ---
app.put("/api/shoes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const shoe = shoes.find((s) => s.id === id);
    if (!shoe) return res.status(404).json({ error: "Not found" });

    const { brand, price, size, color, image } = req.body;
    shoe.brand = brand;
    shoe.price = parseFloat(price);
    shoe.size = size;
    shoe.color = color;
    shoe.image =
        image ||
        "https://galante.com.ua/media/hotcategory/image/i/c/ice-inst_1__1.jpg";

    res.json(shoe);
});


// --- DELETE ---
app.delete("/api/shoes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = shoes.findIndex((s) => s.id === id);
    if (index === -1) return res.status(404).json({ error: "Not found" });
    const removed = shoes.splice(index, 1);
    res.json(removed[0]);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
