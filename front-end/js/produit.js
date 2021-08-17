//Déclaration des variables
let params = new URL(window.location).searchParams; //propriété
let productId = params.get("id");
// console.log(productId);
let productPrice = params.get("price");
const cart = document.querySelector("#cart");
const listePanier = document.querySelector("#liste-panier tbody");
const emptyCartBtn = document.querySelector("#empty-cart");
const containerProduit = document.querySelector("#containerproduit");
let productsCart = {};

//Récupération de l'ID de l'ourson de la page

fetch(`http://localhost:3000/api/teddies/${productId}`)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    // console.log(product);
    displayProduct(product);
  })
  .catch((error) => {
    console.log(error);
  });

//Création de la structure HTML du panier

function displayProduct(product) {
  const price = product.price / 100 + " €";
  containerProduit.insertAdjacentHTML(
    "beforeend",
    `<div class="containerproduit" data-id="${productId}">
  <img class="image" src="${product.imageUrl}" alt="image d'un ourson" />
  <div class="info">
    <h3 class="title">${product.name}</h3>
    <p class="description">${product.description}</p>
    <select name="couleur" id="couleur">
      <option class="label">Sélectionnez la couleur de votre teddy</option>
    </select></br> 
    <div class="quantity"> 
      <label for="quantity">Quantité : </label>
      <input type="number" id="quantity" name="quantity" min="1" max="5" value="1">
    </div>
    <h4 class="price">${price}</h4>
    <button class="btn-add-to-cart" type="submit" >Ajouter au panier</button>
  </div>
</div>`
  );

  //Sélection de la couleur du produit
  const colors = product.colors;
  // console.log(colors);
  colors.forEach(function (color) {
    const couleur = document.querySelector("#couleur");
    couleur.insertAdjacentHTML("beforeend", `<option>${color}</option>`);
  });
}

//Écoute des événements
loadEventListeners();
function loadEventListeners() {
  //Lorsque on ajoute un teddy au panier en cliquant sur le bouton "Ajouter au panier"
  containerProduit.addEventListener("click", addTeddy);

  //Montrer les teddies du localStorage
  document.addEventListener("DOMContentLoaded", () => {
    productsCart = JSON.parse(localStorage.getItem("cart")) || {};
  });
}

function addTeddy(e) {
  e.preventDefault();

  if (e.target.classList.contains("btn-add-to-cart")) {
    const selectedTeddy = e.target.parentElement;

    readInfosTeddy(selectedTeddy);
  }
}

//Lire le contenu du HTML où on a cliqué et extraire les infos du Teddy
function readInfosTeddy() {
  const quantity = parseInt(document.querySelector("#quantity").value, 10);

  //Vérifier si un élément existe déjà dans le panier
  let productInCart = productsCart[productId];

  if (productInCart) {
    //Mettre à jour la quantité

    productsCart[productId] = productInCart + quantity;
  } else {
    //Ajouter teddys au tableau panier
    productsCart[productId] = quantity;
  }

  // console.log(productsCart);

  //Ajouter le panier au localStorage
  syncUpStorage();
}

function syncUpStorage() {
  localStorage.setItem("cart", JSON.stringify(productsCart));
}
