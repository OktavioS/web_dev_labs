class Shoe {
    constructor(brand, price, size, color) {
        this.id = Date.now();
        this.brand = brand;
        this.price = parseFloat(price) || 0;
        this.size = size;
        this.color = color;
        this.image = "https://galante.com.ua/media/hotcategory/image/i/c/ice-inst_1__1.jpg";
    }
}

const shoeList = document.getElementById("shoeList");
const deleteZone = document.getElementById("deleteZone");
const totalOutput = document.getElementById("total");
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

let shoes = JSON.parse(localStorage.getItem("shoes")) || [];
let lastRendered = shoes.slice();
let selectedId = null;
let editingId = null;

renderShoes();

// ------------------ OPEN/CLOSE MODAL ------------------
addShoeBtn.addEventListener("click", () => {
    modal.style.display = "block";
    modalTitle.textContent = "Add Shoe";
    modalForm.reset();
    editingId = null;
});

// ------------------ SELECT & EDIT ------------------
editShoeBtn.addEventListener("click", () => {
    if (!selectedId) return;

    const shoe = shoes.find(s => s.id === selectedId);
    modal.style.display = "block";
    modalTitle.textContent = "Edit Shoe";
    document.getElementById("brand").value = shoe.brand;
    document.getElementById("price").value = shoe.price;
    document.getElementById("size").value = shoe.size;
    document.getElementById("color").value = shoe.color;
    editingId = selectedId;
});

// ------------------ FORM SUBMIT ------------------
modalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const brand = document.getElementById("brand").value;
    const price = document.getElementById("price").value;
    const size = document.getElementById("size").value;
    const color = document.getElementById("color").value;

    if (editingId) {
        const shoe = shoes.find(s => s.id === editingId);
        shoe.brand = brand;
        shoe.price = parseFloat(price);
        shoe.size = size;
        shoe.color = color;
    } else {
        const newShoe = new Shoe(brand, price, size, color);
        shoes.push(newShoe);
    }

    selectedId = null;
    editShoeBtn.disabled = true;
    renderShoes();
    saveToLocalStorage();
    modal.style.display = "none";
});



// ------------------ RENDER SHOES ------------------
function renderShoes(filteredShoes = shoes) {
    shoeList.innerHTML = "";
    lastRendered = filteredShoes.slice();

    filteredShoes.forEach(shoe => {
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

        closeModal.addEventListener("click", () => modal.style.display = "none");
        window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

        card.addEventListener("click", () => {
            document.querySelectorAll(".shoe-card").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            selectedId = shoe.id;
            editShoeBtn.disabled = false;
        });

        document.addEventListener("click", e => {
            if (!e.target.closest(".shoe-card") && !e.target.closest(".edit-btn") && !e.target.closest(".delete-btn")) {
                document.querySelectorAll(".shoe-card.selected").forEach(card => {
                    card.classList.remove("selected");
                });
            }
        });

        card.addEventListener("dragstart", e => e.dataTransfer.setData("id", shoe.id));

        shoeList.appendChild(card);
    });
}

// ------------------ DELETE ------------------
deleteZone.addEventListener("dragover", e => { e.preventDefault(); deleteZone.classList.add("dragover"); });
deleteZone.addEventListener("dragleave", () => deleteZone.classList.remove("dragover"));
deleteZone.addEventListener("drop", e => {
    e.preventDefault();
    deleteZone.classList.remove("dragover");

    const id = e.dataTransfer.getData("id");
    shoes = shoes.filter(s => s.id != id);

    selectedId = null;
    editShoeBtn.disabled = true;

    const searchValue = (searchInput.value || "").toLowerCase();
    if (searchValue) {
        const filteredShoes = shoes.filter(
            s => s.brand.toLowerCase().includes(searchValue) || s.color.toLowerCase().includes(searchValue)
        );
        renderShoes(filteredShoes);
    } else renderShoes();

    saveToLocalStorage();
});

// ------------------ OTHER BUTTONS ------------------
sortAscBtn.addEventListener("click", () => { shoes.sort((a, b) => a.price - b.price); renderShoes(); });
sortDescBtn.addEventListener("click", () => { shoes.sort((a, b) => b.price - a.price); renderShoes(); });
const modalTotal = document.getElementById("modaltotal");
const totalValue = document.getElementById("totalValue");
const backTotal = document.getElementById("backTotal");

totalPriceBtn.addEventListener("click", () => {
    const total = lastRendered.reduce(
        (sum, shoe) => sum + (isNaN(shoe.price) ? 0 : shoe.price),
        0
    );
    totalValue.textContent = `${total} грн`;
    modalTotal.style.display = "block";
});

backTotal.addEventListener("click", () => {
    modalTotal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === modalTotal) modalTotal.style.display = "none";
});

searchInput.addEventListener("input", e => {
    const searchValue = e.target.value.toLowerCase();
    const filteredShoes = shoes.filter(s => s.brand.toLowerCase().includes(searchValue) || s.color.toLowerCase().includes(searchValue));
    renderShoes(filteredShoes);
});



function saveToLocalStorage() {
    localStorage.setItem("shoes", JSON.stringify(shoes));
}

// ------------------ MODAL VALIDATION ------------------
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
