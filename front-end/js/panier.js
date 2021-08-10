//Déclaration des variables du panier

const cart = document.querySelector("#cart");
const listePanier = document.querySelector("#liste-panier tbody");
const totalPanier = document.querySelector(".total-panier");
const emptyCartBtn = document.querySelector("#empty-cart-gohome");
const tableEmptyCart = document.querySelector(".container-panier");
const validateOrderBtn = document.querySelector("#validate-order");
let copyOfProductsCart = JSON.parse(localStorage.getItem("cart"));
let totalCart = 0;
let productsWithQuantity = [];

//Déclaration des variables du formulaire
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const address = document.getElementById("address");
const postcode = document.getElementById("postcode");
const city = document.getElementById("city");
const email = document.getElementById("email");
const form = document.getElementById("order-form");
let error = document.getElementById("error");

function loadEventListeners() {
  //Vider le panier
  emptyCartBtn.addEventListener("click", () => {
    copyOfProductsCart = {}; //Reset panier

    tableEmptyCart.innerHTML = `<p class="empty-cart-message">Votre panier est vide. <a href="index.html" class="empty-cart-message-go-home">Continuez vos achats</a></p>`;

    localStorage.clear(); //Vide le localStorage
  });

  //Validation commande
  validateOrderBtn.addEventListener("click", (e) => {
    e.preventDefault();
    validateOrder();
  });
}

//Affichage des produits du panire dans le DOM
function displayProducts(products) {
  products.forEach((product) => {
    const row = createProductLine(product);
    listePanier.appendChild(row);
  });
}

//Récupération information du produit depuis le localStorage
async function getProductFromServer() {
  const productsId = Object.keys(copyOfProductsCart);
  const promiseArray = productsId.map((productId) => {
    return getProductById(productId);
  });

  const products = await Promise.all(promiseArray);

  return products.map((product) => {
    const quantity = copyOfProductsCart[product._id];
    return {
      ...product,
      quantity,
      price: product.price / 100,
    };
  });
}

// Montrer les produits stockés dans le localStorage
const getProductById = async (productId) => {
  const response = await fetch(
    `http://localhost:3000/api/teddies/${productId}`
  );
  if (!response.ok) {
    throw new Error("Produit inexistant");
  }
  const product = await response.json();
  // console.log(product);
  return product;
};

const createProductLine = (product) => {
  const row = document.createElement("tr");

  row.innerHTML = `
  <td><img src="${product.imageUrl}"></td>
  <td>${product.name}</td>
  <td class="priceTeddy">${product.price} €</td>
  <td class="quantity">${product.quantity}</td>
  <td><button class="btn-delete-teddy"><i class="btn-delete-teddy fas fa-trash-alt" ></i></button></td>`;

  row.setAttribute("data-id", product._id);
  row.addEventListener("click", removeProduct);

  return row;
};

//Supprimer un élément du panier

function removeProduct(e) {
  // console.log("teddy supprimé");
  if (e.target.classList.contains("btn-delete-teddy")) {
    // console.log(e.target);

    const parent = e.target.parentElement.parentElement.parentElement;
    // console.log(parent);

    const teddyId = parent.getAttribute("data-id");
    // console.log(teddyId);

    //Supprime l'élément sélectionné du tableau copyOfProductsCart selon le data-id

    delete copyOfProductsCart[teddyId];

    parent.remove();

    // for (let i = 0; i < productsWithQuantity.length; i++) {
    //   console.log(productsWithQuantity[i]._id);
    //   productsWithQuantity = productsWithQuantity.filter(
    //     (productWithQuantity) => productsWithQuantity[i]._id !== teddyId
    //   );
    // }
    // console.log(productsWithQuantity);

    // console.log(copyOfProductsCart);

    localStorage.setItem("cart", JSON.stringify(copyOfProductsCart));
  }
  // totalCart();
  countCart();
}

//********Calcul de la quantité totale de produits dans le panier
countCart();
function countCart() {
  let totalCount = 0;
  for (let i in copyOfProductsCart) {
    totalCount += copyOfProductsCart[i];
  }

  // console.log(totalCount);

  const itemsInCart = document.querySelector(".carticon");
  itemsInCart.insertAdjacentHTML(
    "beforeend",
    `<p class=totalCount>${totalCount}</p>`
  );
}

//********Calcul total du panier********
// totalCart();
// function totalCart() {
//   // totalCart = productsWithQuantity;
//   console.log(productsWithQuantity);
//   productsWithQuantity.reduce((total, current) => {
//     // console.log(current);
//     return total + current.price * current.quantity;
//   }, 0);
// }

// console.log(totalCart(productsWithQuantity));

// displayTotal();
// async function displayTotal() {
//   const displayTotal = document.querySelector(".total-price");
//   displayTotal.innerHTML = `<div class="display-price-html">Total : ${totalCart(
//     productsWithQuantity
//   )} €</div>`;
//   totalCart();
// }

//********Validation et envoi du formulaire de commande********

function validateForm() {
  // form.addEventListener("submit", function (e) {
  //   e.preventDefault();
  let messages = [];

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const postcodeRegex = /[0-9]{5}(-[0-9]{4})?/;

  if (firstName.value === "" || firstName.value === null) {
    messages.push("Prénom invalide");
  }
  if (lastName.value === "" || lastName.value === null) {
    messages.push("Nom invalide");
  }
  if (address.value === "" || address.value === null) {
    messages.push("Adresse invalide");
  }
  if (
    postcode.value === "" ||
    postcode.value === null ||
    !postcodeRegex.test(postcode.value)
  ) {
    messages.push("Code postal invalide");
  }
  if (city.value === "" || city.value === null) {
    messages.push("Ville invalide");
  }
  if (
    email.value === "" ||
    email.value === null ||
    !emailRegex.test(email.value)
  ) {
    messages.push("Email invalide");
  }
  if (messages.length > 0) {
    error.innerText = messages.join(" - ");
    return;
  }
  // });
}

function sendOrder() {
  //Création d'un objet contact
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    postcode: postcode.value,
    city: city.value,
    email: email.value,
  };
  // console.log(contact);

  //Création d'un tableau régroupant les id des teddies sélectionnés
  let products = [];
  Object.entries(copyOfProductsCart).forEach(([id, quantity]) => {
    for (let i = 0; i < quantity; i++) {
      products.push(id);
    }
  });
  console.log(products);

  //Créaton d'un objet regroupant contact et produits
  let orderData = { contact, products };

  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    body: JSON.stringify(orderData),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("orderId", data.orderId);
      localStorage.setItem("totalCart", `${totalCart(productsWithQuantity)}`);
      window.location.href = "./confirmation.html";
    })
    .catch(() => {
      if (!response.ok) {
        throw new Error(
          "Nous avons rencontré un souci lors de votre commande, merci de revenir ultérieurement."
        );
      }
    });
}

function validateOrder() {
  validateForm();
  sendOrder();
}
(async function () {
  loadEventListeners();
  const products = await getProductFromServer();
  productsWithQuantity = products;
  displayProducts(products);
  // console.log(productsWithQuantity);
  // displayTotal(products);

  totalCart = (productsWithQuantity) => {
    // console.log(productsWithQuantity);
    return productsWithQuantity.reduce((total, current) => {
      // console.log(current);
      return total + current.price * current.quantity;
    }, 0);
  };

  console.log(totalCart(productsWithQuantity));

  const displayTotal = document.querySelector(".total-price");
  displayTotal.innerHTML = `<div class="display-price-html">Total : ${totalCart(
    productsWithQuantity
  )} €</div>`;
})();
