//Déclaration des variables du panier

const cart = document.querySelector("#cart");
const listePanier = document.querySelector("#liste-panier tbody");
const emptyCartBtn = document.querySelector("#empty-cart-gohome");
let copyOfProductsCart = JSON.parse(localStorage.getItem("cart"));
console.log(copyOfProductsCart);
let total = 0;

//Déclaration des variables du formulaire
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const address = document.getElementById("address");
const postcode = document.getElementById("postcode");
const city = document.getElementById("city");
const email = document.getElementById("email");
const form = document.getElementById("order-form");
let error = document.getElementById("error");
const contact = {
  firstName: firstName.value,
  lastName: lastName.value,
  address: address.value,
  postcode: postcode.value,
  city: city.value,
  email: email.value,
};

loadEventListeners();
function loadEventListeners() {
  //Supprimer des éléments du panier

  //Vider le panier
  emptyCartBtn.addEventListener("click", () => {
    // console.log("panier vide");
    copyOfProductsCart = []; //Reset panier

    const tableCart = document.querySelector(".container-panier");
    tableCart.innerHTML = "";
    tableCart.insertAdjacentHTML(
      "beforeend",
      `<p class="empty-cart-message">Votre panier est vide. <a href="index.html" class="empty-cart-message-go-home">Continuez vos achats</a></p>`
    );

    emptyProductLine(); //Supprime tout le HTML du panier
    localStorage.clear(); //Vide le localStorage
  });
}

//Montrer les produits stockés dans le localStorage

function displayProductsFromLocalStorage() {
  copyOfProductsCart.forEach((storageProduct) => {
    getProductById(storageProduct.id).then((product) => {
      const row = createProductLine(product, storageProduct.quantity);
      listePanier.appendChild(row);
    });
  });
}

const getProductById = async (productId) => {
  const response = await fetch(
    `http://localhost:3000/api/teddies/${productId}`
  );
  if (!response.ok) {
    throw new Error("Produit inexistant");
  }
  const product = await response.json();

  return product;
};

const createProductLine = (product, quantity) => {
  const price = product.price / 100 + " €";
  const row = document.createElement("tr");

  row.innerHTML = `
  <td><img src="${product.imageUrl}"></td>
  <td>${product.name}</td>
  <td>${price}</td>
  <td>${quantity}</td>
  <td><button class="btn-delete-teddy"><i class="btn-delete-teddy fas fa-trash-alt" ></i></button></td>`;

  row.setAttribute("data-id", product._id);
  row.addEventListener("click", removeProduct);

  return row;
};

displayProductsFromLocalStorage();

//Supprimer un élément du panier

function removeProduct(e) {
  console.log("teddy supprimé");
  if (e.target.classList.contains("btn-delete-teddy")) {
    console.log(e.target);

    const parent = e.target.parentElement.parentElement.parentElement;
    console.log(parent);

    const teddyId = parent.getAttribute("data-id");
    console.log(teddyId);
    //Supprime l'élément sélectionné du tableau copyOfProductsCart selon le data-id
    copyOfProductsCart = copyOfProductsCart.filter(
      (storageProduct) => storageProduct.id !== teddyId
    );

    parent.remove();

    console.log(copyOfProductsCart);

    // localStorage.setItem("cart", JSON.stringify(copyOfProductsCart));

    // createProductLine();
  }
}

//Supprimer les teddies du tbody
function emptyProductLine() {
  // listePanier.innerHTML = "";
  while (listePanier.firstChild) {
    listePanier.removeChild(listePanier.firstChild);
  }
}

//********Calcul total du panier********

//Déclaration de la variable pour pouvoir y mettre les prix présents dand le panier

let totalCart = [];

//Je récupère les prix dans le panier
for (let i = 0; i < copyOfProductsCart.length; i++) {
  let productsCartPrice =
    copyOfProductsCart[i].price * copyOfProductsCart[i].quantity;

  //Mettre les prix du panier dans la variable totalCart
  totalCart.push(productsCartPrice);
  // console.log(totalCart);
}

//Addition des prix qu'il y a dans le tableau de la variable totalCart avec la méthode reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalCart.reduce(reducer, 0);
// console.log(totalPrice);

//Injection HTML dans la page panier
const tableCart = document.querySelector("#cart");

tableCart.insertAdjacentHTML(
  "beforeend",

  `<div class="display-price-html">Total : ${totalPrice} €</div>`
);

//********Validation et envoi du formulaire de commande********

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let messages = [];

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const postcodeRegex = /[0-9]{5}(-[0-9]{4})?/;

  if (firstName.value === "" || firstName.value == null) {
    messages.push("Prénom invalide");
  }
  if (lastName.value === "" || lastName.value == null) {
    messages.push("Nom invalide");
  }
  if (address.value === "" || address.value == null) {
    messages.push("Adresse invalide");
  }
  if (
    postcode.value === "" ||
    postcode.value == null ||
    !postcodeRegex.test(postcode.value)
  ) {
    messages.push("Code postal invalide");
  }
  if (city.value === "" || city.value == null) {
    messages.push("Ville invalide");
  }
  if (
    email.value === "" ||
    email.value == null ||
    !emailRegex.test(email.value)
  ) {
    messages.push("Email invalide");
  }
  if (messages.length > 0) {
    e.preventDefault();
    error.innerText = messages.join(" - ");
    return;
  }

  let contact = new FormData(this);
  console.log(contact);

  console.log(contact.get("firstname"));
  console.log(contact.get("lastname"));
  console.log(contact.get("address"));
  console.log(contact.get("postcode"));
  console.log(contact.get("city"));
  console.log(contact.get("email"));

  // fetch("http://localhost:3000/api/teddies/order", {
  //   method: "POST",
  //   body: JSON.stringify(contact),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // .then((response) => response.json())
  // .then((data) => {
  //   console.log(data);
  // });
});
