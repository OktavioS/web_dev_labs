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
const totalFullscreen = document.getElementById("totalFullscreen");
const totalValue = document.getElementById("totalValue");
const backTotal = document.getElementById("backTotal");
const searchInput = document.getElementById("searchInput");

const fullscreen = document.getElementById("fullscreen");
const fullscreenForm = document.getElementById("fullscreenForm");
const fullscreenTitle = document.getElementById("fullscreenTitle");
const addShoeBtn = document.getElementById("addShoeBtn");
const editShoeBtn = document.getElementById("editShoeBtn");
const cancelFullscreen = document.getElementById("cancelFullscreen");

const fsBrand = document.getElementById("fsBrand");
const fsPrice = document.getElementById("fsPrice");
const fsSize = document.getElementById("fsSize");
const fsColor = document.getElementById("fsColor");

let shoes = JSON.parse(localStorage.getItem("shoes")) || [];
let lastRendered = shoes.slice();
let selectedId = null;
let editingId = null;

renderShoes();


addShoeBtn.addEventListener("click", () => {
    fullscreen.style.display = "flex";
    fullscreenTitle.textContent = "Add Shoe";
    fullscreenForm.reset();
    editingId = null;
});

editShoeBtn.addEventListener("click", () => {
    if(!selectedId) return;
    const shoe = shoes.find(s => s.id === selectedId);
    fullscreen.style.display = "flex";
    fullscreenTitle.textContent = "Edit Shoe";
    fsBrand.value = shoe.brand;
    fsPrice.value = shoe.price;
    fsSize.value = shoe.size;
    fsColor.value = shoe.color;
    editingId = selectedId;
});

cancelFullscreen.addEventListener("click", () => {
    fullscreen.style.display = "none";
});


fullscreenForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if(editingId){
        const shoe = shoes.find(s => s.id === editingId);
        shoe.brand = fsBrand.value;
        shoe.price = parseFloat(fsPrice.value);
        shoe.size = fsSize.value;
        shoe.color = fsColor.value;
    } else {
        const newShoe = new Shoe(fsBrand.value, fsPrice.value, fsSize.value, fsColor.value);
        shoes.push(newShoe);
    }

    selectedId = null;
    editShoeBtn.disabled = true;
    fullscreen.style.display = "none";
    renderShoes();
    saveToLocalStorage();
});


window.addEventListener("load", () => {
    fullscreen.style.display = "none";
    totalFullscreen.style.display = "none";
});

function renderShoes(filteredShoes = shoes){
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

        card.addEventListener("click", () => {
            document.querySelectorAll(".shoe-card").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            selectedId = shoe.id;
            editShoeBtn.disabled = false;
        });

        card.addEventListener("dragstart", e => e.dataTransfer.setData("id", shoe.id));
        shoeList.appendChild(card);
    });
}

// DELETE
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
    if(searchValue) {
        const filteredShoes = shoes.filter(s => s.brand.toLowerCase().includes(searchValue) || s.color.toLowerCase().includes(searchValue));
        renderShoes(filteredShoes);
    } else renderShoes();

    saveToLocalStorage();
});

// SORT / TOTAL / SEARCH
sortAscBtn.addEventListener("click", () => { shoes.sort((a,b) => a.price - b.price); renderShoes(); });
sortDescBtn.addEventListener("click", () => { shoes.sort((a,b) => b.price - a.price); renderShoes(); });
totalPriceBtn.addEventListener("click", () => {
    const total = shoes.reduce((sum, shoe) => sum + (isNaN(shoe.price)?0:shoe.price), 0);
    totalValue.innerText = `Загальна сума: ${total} грн`;
    totalFullscreen.style.display = "flex";
});
searchInput.addEventListener("input", e => {
    const searchValue = e.target.value.toLowerCase();
    const filteredShoes = shoes.filter(s => s.brand.toLowerCase().includes(searchValue) || s.color.toLowerCase().includes(searchValue));
    renderShoes(filteredShoes);
});

backTotal.addEventListener("click", () => {
    totalFullscreen.style.display = "none";
});

function saveToLocalStorage(){ localStorage.setItem("shoes", JSON.stringify(shoes)); }


