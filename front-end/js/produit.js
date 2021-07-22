// export { productsCart };

//Déclaration des variables
let params = new URL(window.location).searchParams;
let productId = params.get("id");
const cart = document.querySelector("#cart");
const listePanier = document.querySelector("#liste-panier tbody");
const emptyCartBtn = document.querySelector("#empty-cart");
const containerProduit = document.querySelector("#containerproduit");
let productsCart = [];

//Récupération de l'ID de l'ourson de la page

fetch(`http://localhost:3000/api/teddies/${productId}`)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    // console.log(product);
    displayProduct(product);
    // addCartBtn();
  })
  .catch((error) => {
    console.log(error);
  });

//création de la structure HTML du panier

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
  // console.log(containerProduit);

  //Sélection de la couleur du produit
  const colors = product.colors;
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
  // containerProduit.addEventListener("DOMContentLoaded", showProductQuantity);

  // //Supprimer des éléments du panier
  // cart.addEventListener("click", removeProduct);

  //Montrer les teddies du localStorage
  document.addEventListener("DOMContentLoaded", () => {
    productsCart = JSON.parse(localStorage.getItem("cart")) || [];

    // cartHTML();
  });

  //Vider le panier
  // emptyCartBtn.addEventListener("click", () => {
  //   // console.log("panier vide");
  //   productsCart = []; //Reset panier

  //   // emptyHTML(); //Supprime tout le HTML du panier
  // localStorage.clear(); //Vide le localStorage
  // });
}

//Functions

function addTeddy(e) {
  e.preventDefault();

  if (e.target.classList.contains("btn-add-to-cart")) {
    const selectedTeddy = e.target.parentElement;

    lireInfosTeddy(selectedTeddy);
  }
}

// //Supprimer un élément du panier
// function removeProduct(e) {
//   console.log("teddy supprimé");
//   if (e.target.classList.contains("supprimer-teddy")) {
//     const teddyId = e.target.getAttribute("data-id");

//     //Supprimer du tableau productsCart selon le data-id
//     productsCart = productsCart.filter((product) => product.id !== teddyId);

//     // localStorage.removeItem("teddyId");
//     cartHTML(); //Itère sur le panier et montre le HTML
//   }
// }

//Lire le contenu du HTML où on a cliqué et extraire les infos du Teddy
function lireInfosTeddy() {
  // console.log(teddy);

  //Création d'un objet avec le contenu du teddy sélectionné
  const infoTeddy = {
    image: document.querySelector(".image").src,
    title: document.querySelector(".title").textContent,
    price: parseInt(document.querySelector(".price").textContent, 10),
    id: productId,
    quantity: parseInt(document.querySelector("#quantity").value, 10),
  };

  //Vérifier si un élément existe déjà dans le panier
  const alreadyInCart = productsCart.some(
    (product) => product.id === infoTeddy.id
  );

  if (alreadyInCart) {
    //Mettre à jour la quantité
    const teddies = productsCart.map((product) => {
      if (product.id === infoTeddy.id) {
        product.quantity++;
        return product; //Retourne le produit avec la quantité mise à jour
      } else {
        return product; //Retourne les produits qui n'étaient pas déjà dans le panier
      }
    });
    productsCart = [...teddies];
  } else {
    //Ajouter teddys au tableau panier
    productsCart = [...productsCart, infoTeddy]; //Je récupère mon panier précédent (vide ou avec un produit ajouté précédement)
  }

  console.log(productsCart);
  // cartHTML();

  //Ajouter le panier au localStorage
  syncUpStorage();
}

//Montrer le panier dans le HTML
// function cartHTML() {
//   //Vider le HTML pour éviter le doublon
//   emptyHTML();

//   // Parcourir le panier et générer le HTML
//   productsCart.forEach((product) => {
//     // console.log(product);
//     const row = document.createElement("tr");
//     row.innerHTML = `
//     <td><img src="${product.image}" width="100"></td>
//     <td>${product.title}</td>
//     <td>${product.price}</td>
//     <td>${product.quantity}</td>
//     <td>
//       <a href="#" class="supprimer-teddy" data-id="${productId}"><i class="fas fa-trash-alt"></i></a>
//     </td>`;
//     //Ajouter le HTML du panier dans le tbody
//     listePanier.appendChild(row);
//   });

//   // //Ajouter le panier au localStorage
//   // syncUpStorage();
// }

function syncUpStorage() {
  localStorage.setItem("cart", JSON.stringify(productsCart));
}

// function getTotalQuantityInCart(productsCart) {
//   let productsInCart = [];
//   productsCart.forEach((product) => {
//     productsInCart = produc.quantity;
//     console.log(productsInCart);
//   });
// }
// function showProductQuantity() {
//   const cartIcon = document.querySelector(".carticon");

//   cartIcon.insertAdjacentHTML("beforeend", `<p>TEST</>`);
// }

//Supprimer les teddies du tbody
// function emptyHTML() {
//   // listePanier.innerHTML = "";
//   while (listePanier.firstChild) {
//     listePanier.removeChild(listePanier.firstChild);
//   }
// }
