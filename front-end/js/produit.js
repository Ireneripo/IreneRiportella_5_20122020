//Déclaration des variables
let params = new URL(window.location).searchParams;
let produitId = params.get("id");
const cart = document.querySelector("#cart");
const listePanier = document.querySelector("#liste-panier tbody");
const emptyCartBtn = document.querySelector("#empty-cart");
const containerProduit = document.querySelector("#containerproduit");
let productsCart = [];
let url = new URL("http://localhost:3000/api/teddies/");

//Récupération de l'ID de l'ourson de la page

fetch(`http://localhost:3000/api/teddies/${produitId}`)
  .then((data) => {
    return data.json();
  })
  .then((produit) => {
    // console.log(produit);
    displayProduct(produit);
    // addCartBtn();
  })
  .catch((error) => {
    console.log(error);
  });

//création de la structure HTML du produit

function displayProduct(produit) {
  const price = produit.price / 100 + " €";
  containerProduit.insertAdjacentHTML(
    "beforeend",
    `<div class="containerproduit" data-id="${produitId}">
  <img class="image" src="${produit.imageUrl}" alt="image d'un ourson" />
  <div class="info">
    <h3 class="titre">${produit.name}</h3>
    <p class="description">${produit.description}</p>
    <select name="couleur" id="couleur">
      <option class="label">Sélectionnez la couleur de votre teddy</option>
    </select></br> 
    <div class="quantite"> 
      <label for="quantite">Quantité : </label>
      <input type="number" id="quantite" name="quantite" min="1" max="5" value="1">
    </div>
    <h4 class="price">${price}</h4>
    <button class="btn-add-to-cart" type="submit" >Ajouter au panier</button>
  </div>
</div>`
  );
  // console.log(containerProduit);

  //Sélection de la couleur du produit
  const colors = produit.colors;
  // console.log(colors);
  colors.forEach(function (color) {
    const couleur = document.querySelector("#couleur");
    couleur.insertAdjacentHTML("beforeend", `<option>${color}</option>`);
  });
}

loadEventListeners();
function loadEventListeners() {
  //Lorsque on ajoute un teddy au panier en cliquant sur le bouton "Ajouter au panier"
  containerProduit.addEventListener("click", addTeddy);

  //Supprimer des éléments du panier
  cart.addEventListener("click", removeProduct);

  //Montrer les cours du localStorage
  document.addEventListener("DOMContentLoaded", () => {
    productsCart = JSON.parse(localStorage.getItem("cart")) || [];

    cartHTML();
  });

  //Vider le panier
  emptyCartBtn.addEventListener("click", () => {
    // console.log("panier vide");
    productsCart = []; //Reset panier

    emptyHTML(); //Supprime tout le HTML du panier
    localStorage.clear(); //Vide le localStorage
  });
}

//Functions

function addTeddy(e) {
  e.preventDefault();

  if (e.target.classList.contains("btn-add-to-cart")) {
    const selectedTeddy = e.target.parentElement;

    lireInfosTeddy(selectedTeddy);
  }
}

//Supprimer un élément du panier
function removeProduct(e) {
  // console.log("teddy supprimé");
  if (e.target.classList.contains("supprimer-teddy")) {
    const teddyId = e.target.getAttribute("data-id");

    //Supprimer du tableau productsCart selon le data-id
    productsCart = productsCart.filter((produit) => produit.id !== teddyId);

    // localStorage.removeItem("teddyId");
    cartHTML(); //Itère sur le panier et montre le HTML
  }
}

//Lire le contenu du HTML où on a cliqué et extraire les infos du Teddy
function lireInfosTeddy() {
  // console.log(teddy);

  //Création d'un objet avec le contenu du teddy sélectionné
  const infoTeddy = {
    image: document.querySelector(".image").src,
    titre: document.querySelector(".titre").textContent,
    prix: document.querySelector(".price").textContent,
    id: produitId,
    quantite: document.querySelector("#quantite").value,
  };

  //Vérifier si un élément existe déjà dans le panier
  const alreadyInCart = productsCart.some(
    (produit) => produit.id === infoTeddy.id
  );

  if (alreadyInCart) {
    //Mettre à jour la quantité
    const teddies = productsCart.map((produit) => {
      if (produit.id === infoTeddy.id) {
        produit.quantite++;
        return produit; //Retourne le produit avec la quantité mise à jour
      } else {
        return produit; //Retourne les produits qui n'étaient pas déjà dans le panier
      }
    });
    productsCart = [...teddies];
  } else {
    //Ajouter teddys au tableau panier
    productsCart = [...productsCart, infoTeddy]; //Je récupère mon panier précédent (vide ou avec un produit ajouté précédement)
  }

  console.log(productsCart);
  cartHTML();
}

//Montrer le panier dans le HTML
function cartHTML() {
  //Vider le HTML pour éviter le doublon
  emptyHTML();

  // Parcourir le panier et générer le HTML
  productsCart.forEach((produit) => {
    // console.log(produit);
    const row = document.createElement("tr");
    row.innerHTML = `
    <td><img src="" width="100"></td>
    <td>${produit.titre}</td>
    <td>${produit.price}</td>
    <td>${produit.quantite}</td>
    <td>
      <a href="#" class="supprimer-teddy" data-id="${produitId}"><i class="fas fa-trash-alt"></i></a>
    </td>`;
    //Ajouter le HTML du panier dans le tbody
    listePanier.appendChild(row);
  });

  //Ajouter le panier au localStorage
  syncUpStorage();
}

function syncUpStorage() {
  localStorage.setItem("cart", JSON.stringify(productsCart));
}

//Supprimer les teddies du tbody
function emptyHTML() {
  // listePanier.innerHTML = "";
  while (listePanier.firstChild) {
    listePanier.removeChild(listePanier.firstChild);
  }
}

//Ajout du produit au panier

//Ajout du produit au panier
// function addCartBtn() {
//   const btnAddToCart = document.querySelector(".btn-add-to-cart");
//   console.log(btnAddToCart);
//   btnAddToCart.addEventListener("click", function (event) {
//     event.preventDefault();
//     addToCart();
//   });
//   function addToCart() {
//     let localCart = localStorage.getItem("selectedProduct");
//     if (localCart == null) {
//       localCart = { [produitId]: 0 };
//     } else {
//       localCart = JSON.parse(localCart);
//     }

//     const quantity = document.querySelector("#quantite").value;
//     console.log(quantity);
//     localCart[produitId] += +quantity;

//     localStorage.setItem("selectedProduct", JSON.stringify(localCart));
//   }
// }

// //Ajout du produit au panier
// function addCartBtn() {
//   const btnAddToCart = document.querySelector(".btn-add-to-cart");
//   console.log(btnAddToCart);
//   btnAddToCart.addEventListener("click", function (event) {
//     event.preventDefault();
//     addToCart();
//   });
//   function addToCart() {
//     let localCart = localStorage.getItem("selectedProduct");
//     if (localCart == null) {
//       localCart = { [produitId]: 0 };
//     } else {
//       localCart = JSON.parse(localCart);
//     }
//     const quantity = document.querySelector("#quantite").value;
//     console.log(quantity);
//     localCart[produitId] += +quantity;
//     localStorage.setItem("selectedProduct", JSON.stringify(localCart));
//   }
// }

// // Ajout du produit au panier

// function addToCart() {
//   let localCart = localStorage.getItem("selectedProduct");
//   console.log(localCart);
//   if (localCart === null) {
//     localCart = { [produitId]: 0 };
//   } else {
//     localCart = JSON.parse(localCart);
//   }
//   console.log(localCart);
//   const quantity = document.querySelector("#quantite").value;
//   console.log(quantity);
//   localCart[produitId] += +quantity;

//   localStorage.setItem("selectedProduct", JSON.stringify(localCart));
// }

// function addCartBtn() {
//   const btnAddToCart = document.querySelector(".btn-add-to-cart");
//   console.dir(btnAddToCart);
//   btnAddToCart.addEventListener("click", function (event) {
//     event.preventDefault();
//     addToCart();
//   });
// }

// //Ajout du produit au panier
// let localCart = [];
// function addToCart() {
//   let productsInCart = localStorage.getItem("productsInCart");
//   localCart = JSON.parse(productsInCart);
//   if (productsInCart) {
//     let quantity = document.querySelector("#quantite").value;

//     //if the Teddy has not already been added
//     if (!productsInCart.includes(produitId)) {
//       productsInCart.produitId = 0;
//     } else {
//       productsInCart.produitId += +quantity;
//       localStorage.setItem("selectedProduct", JSON.stringify(localCart));
//     }
//   }
// }
