// === URL до бекенду ===
const API_URL = "http://localhost:3000/api/shoes";

class Shoe {
    constructor(brand, price, size, color) {
        this.brand = brand;
        this.price = parseFloat(price) || 0;
        this.size = size;
        this.color = color;
        this.image = "https://galante.com.ua/media/hotcategory/image/i/c/ice-inst_1__1.jpg";
    }
}

const shoeList = document.getElementById("shoeList");
const deleteZone = document.getElementById("deleteZone");
const sortAscBtn = document.getElementById("sortAsc");
const sortDescBtn = document.getElementById("sortDesc");
const totalPriceBtn = document.getElementById("totalPrice");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("modal");
const modalForm = document.getElementById("modalForm");
const closeModal = document.getElementById("closeModal");
const addShoeBtn = document.getElementById("addShoeBtn");
const editShoeBtn = document.getElementById("editShoeBtn");
const modalTitle = document.getElementById("modalTitle");

const modalTotal = document.getElementById("modaltotal");
const totalValue = document.getElementById("totalValue");
const backTotal = document.getElementById("backTotal");

let shoes = [];
let lastRendered = [];
let selectedId = null;
let editingId = null;

// ------------------ LOAD FROM SERVER ------------------
async function loadShoes() {
    const res = await fetch(API_URL);
    shoes = await res.json();
    lastRendered = shoes.slice();
    renderShoes(shoes);
}

loadShoes();

// ------------------ RENDER ------------------
function renderShoes(filteredShoes = shoes) {
    shoeList.innerHTML = "";
    lastRendered = filteredShoes.slice();

    filteredShoes.forEach((shoe) => {
        const card = document.createElement("div");
        card.className = "shoe-card";
        card.draggable = true;
        card.innerHTML = `
      <img src="${shoe.image}" alt="Shoe" />
      <h3>${shoe.brand}</h3>
      <p>Ціна: ${shoe.price} грн</p>
      <p>Розмір: ${shoe.size}</p>
      <p>Колір: ${shoe.color}</p>
    `;

        card.addEventListener("click", () => {
            document.querySelectorAll(".shoe-card").forEach((c) => c.classList.remove("selected"));
            card.classList.add("selected");
            selectedId = shoe.id;
            editShoeBtn.disabled = false;
        });

        card.addEventListener("dragstart", (e) => e.dataTransfer.setData("id", shoe.id));
        shoeList.appendChild(card);
    });
}

// ------------------ ADD ------------------
addShoeBtn.addEventListener("click", () => {
    modal.style.display = "block";
    modalTitle.textContent = "Add Shoe";
    modalForm.reset();
    editingId = null;
});

closeModal.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

// ------------------ EDIT ------------------
editShoeBtn.addEventListener("click", async () => {
    if (!selectedId) return;
    const shoe = shoes.find((s) => s.id === selectedId);
    if (!shoe) return;

    modal.style.display = "block";
    modalTitle.textContent = "Edit Shoe";
    document.getElementById("brand").value = shoe.brand;
    document.getElementById("price").value = shoe.price;
    document.getElementById("size").value = shoe.size;
    document.getElementById("color").value = shoe.color;
    editingId = selectedId;
});

// ------------------ SUBMIT FORM ------------------
modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const brand = document.getElementById("brand").value.trim();
    const price = document.getElementById("price").value;
    const size = document.getElementById("size").value;
    const color = document.getElementById("color").value.trim();

    if (!brand || !color) {
        alert("Назва бренду та колір не можуть бути порожніми або складатись лише з пробілів!");
        return;
    }

    const shoeData = new Shoe(brand, price, size, color);


    if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(shoeData),
        });
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(shoeData),
        });
    }

    modal.style.display = "none";
    editShoeBtn.disabled = true;
    selectedId = null;
    await loadShoes();
});

// ------------------ DELETE ------------------
deleteZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    deleteZone.classList.add("dragover");
});
deleteZone.addEventListener("dragleave", () => deleteZone.classList.remove("dragover"));
deleteZone.addEventListener("drop", async (e) => {
    e.preventDefault();
    deleteZone.classList.remove("dragover");
    const id = e.dataTransfer.getData("id");
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    await loadShoes();
});

// ------------------ SORT ------------------
sortAscBtn.addEventListener("click", () => {
    const sorted = [...shoes].sort((a, b) => a.price - b.price);
    renderShoes(sorted);
});
sortDescBtn.addEventListener("click", () => {
    const sorted = [...shoes].sort((a, b) => b.price - a.price);
    renderShoes(sorted);
});

// ------------------ TOTAL PRICE ------------------
totalPriceBtn.addEventListener("click", () => {
    const total = lastRendered.reduce((sum, s) => sum + (isNaN(s.price) ? 0 : s.price), 0);
    totalValue.textContent = `${total} грн`;
    modalTotal.style.display = "block";
});
backTotal.addEventListener("click", () => (modalTotal.style.display = "none"));
window.addEventListener("click", (e) => { if (e.target === modalTotal) modalTotal.style.display = "none"; });

// ------------------ SEARCH ------------------
searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = shoes.filter(
        (s) =>
            s.brand.toLowerCase().includes(searchValue) ||
            s.color.toLowerCase().includes(searchValue)
    );
    renderShoes(filtered);
});

// ------------------ VALIDATION ------------------
function blockDigits(input) {
    input.addEventListener("keydown", (e) => {
        if (/\d/.test(e.key)) {
            e.preventDefault();
            alert("У цьому полі не можна вводити цифри!");
        }
    });
}

function blockLetters(input) {
    input.addEventListener("keydown", (e) => {
        if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab|\./.test(e.key)) {
            e.preventDefault();
            alert("У цьому полі можна вводити лише числа!");
        }
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const brandInput = document.getElementById("brand");
    const colorInput = document.getElementById("color");
    const priceInput = document.getElementById("price");
    const sizeInput = document.getElementById("size");
    if (brandInput) blockDigits(brandInput);
    if (colorInput) blockDigits(colorInput);
    if (priceInput) blockLetters(priceInput);
    if (sizeInput) blockLetters(sizeInput);
});
