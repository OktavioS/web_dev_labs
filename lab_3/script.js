class Shoe {
    constructor(brand, price, size, color) {
        this.id = Date.now(); // Унікальний ID
        this.brand = brand;
        this.price = price;
        this.size = size;
        this.color = color;
        this.image = "https://galante.com.ua/media/hotcategory/image/i/c/ice-inst_1__1.jpg"; // дефолтна картинка
    }
}

const shoeForm = document.getElementById("shoeForm");
const shoeList = document.getElementById("shoeList");
const deleteZone = document.getElementById("deleteZone");

// ⬇️ Завантажуємо дані з localStorage або створюємо пустий масив
let shoes = JSON.parse(localStorage.getItem("shoes")) || [];

renderShoes();

shoeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const brand = document.getElementById("brand").value;
    const price = document.getElementById("price").value;
    const size = document.getElementById("size").value;
    const color = document.getElementById("color").value;

    const newShoe = new Shoe(brand, price, size, color);
    shoes.push(newShoe);

    renderShoes();
    saveToLocalStorage(); // 💾 зберегти
    shoeForm.reset();
});

function renderShoes() {
    shoeList.innerHTML = "";

    shoes.forEach((shoe) => {
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

        card.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("id", shoe.id);
        });

        shoeList.appendChild(card);
    });
}

deleteZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    deleteZone.classList.add("dragover");
});

deleteZone.addEventListener("dragleave", () => {
    deleteZone.classList.remove("dragover");
});

deleteZone.addEventListener("drop", (e) => {
    e.preventDefault();
    deleteZone.classList.remove("dragover");

    const id = e.dataTransfer.getData("id");
    shoes = shoes.filter((shoe) => shoe.id != id);

    renderShoes();
    saveToLocalStorage(); // оновити сховище
});

function saveToLocalStorage() {
    localStorage.setItem("shoes", JSON.stringify(shoes));
}
