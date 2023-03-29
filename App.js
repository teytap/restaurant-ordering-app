import { menuArray } from "./data.js";

const menuContainer = document.getElementById("menu-container");
const orderContainer = document.querySelector(".order-container");
const closeModal = document.querySelector(".close-modal");
const payModal = document.querySelector(".pay-modal");

let orderedFoods = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
  } else if (e.target.dataset.complete) {
    handleCompleteClick();
  } else if (e.target.dataset.pay) {
    handlePayClick(e);
  }
});

function handleCompleteClick() {
  setTimeout(() => {
    payModal.style.display = "flex";
  }, 700);
}
function handlePayClick(e) {
  e.preventDefault();
  const fullName = document.querySelector("#full-name").value;
  const cardNumber = document.querySelector("#card-number").value;
  const cvv = document.querySelector("#cvv").value;
  if (fullName && cardNumber && cvv) {
    setTimeout(() => {
      payModal.style.display = "none";
      orderContainer.innerHTML = `<h1 class="thanks">Thanks ${fullName}! Your order is on its way!</h1>`;
    }, 700);
  }
}
function handleAddClick(foodId) {
  orderedFoods.push(menuArray[foodId]);
  renderOrderedHtml();
}

function handleRemoveClick(removeId) {
  const index = orderedFoods.findIndex((obj) => obj.id == removeId);
  if (index > -1) {
    orderedFoods.splice(index, 1);
  }
  renderOrderedHtml();
}

function renderOrderedHtml() {
  const orderedItems = document.querySelector(".ordered-items");
  const totalPriceContainer = document.querySelector(".total-price-container");
  let orderedHtml = "";
  let totalPrice = 0;
  orderedFoods.forEach(function (x) {
    totalPrice += x.price;
    orderedHtml += `
    <div class="ordered-item"><h2>${x.name}<span class="remove-item" data-remove=${x.id}> remove</span></h2>
          <h4>$${x.price}</h4></div>
    
    `;
  });
  orderedItems.innerHTML = orderedHtml;
  totalPriceContainer.innerHTML = `
            <h2>Total Price</h2>
            <h4>$${totalPrice}</h4>
          `;
  orderContainer.style.display = orderedFoods.length === 0 ? "none" : "block";
}
closeModal.addEventListener("click", function () {
  payModal.style.display = "none";
});

function render() {
  let menuElements = "";
  menuArray.forEach(function (food) {
    menuElements += `
        <div class="menu-el">
        <div class="menu-emoji">${food.emoji}</div>
        <div "menu-el-info"><h2>${food.name}</h2><div class="ingredients">${food.ingredients}</div><h3>$${food.price}</h3></div>
        <button class="add-btn" data-add=${food.id}>+</button>
        </div>`;
  });
  menuContainer.innerHTML = menuElements;
}
render();
