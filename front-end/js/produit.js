//récupération de l'ID de l'ourson de la page

const url = window.location.search;
const id = new URLSearchParams(url);
const produit = id.get("id");
console.log(produit);

fetch(`http://localhost:3000/${produit}`)
  .then((httpBodyResponse) => {
    return httpBodyResponse.json();
  })
  .then((produit) => {
    displayProduct([produit]);
  })
  .catch((error) => {
    console.log(error);
  });

//création de la structure HTML du produit

// function displayProduct(produits) {
//   produits.forEach((produit) => {
//     const container = document.querySelector("#container");
//     container.innerHTML = `<div>
//           <img class="image" src="" alt="image d'un ourson" />
//           <h3 class="titre"></h3>
//           <p class="description"></p>
//           <select name="couleur" id="couleur"></select>
//           <select name="quantité" id="quantite"></select>
//           <h4 class="price"></h4>
//           <button class="addtocart" type="submit" ></button>
//         </div>`;
//     console.log(container);

//     titre.textContent = produit.name;

//     description.textContent = produit.description;

//     prix.textContent = produit.price / 100 + " €";

//     image.src = produit.imageUrl;

//     addToCart.textContent = "Ajouter au panier";
//   });
// }

//création choix produits
// function selectColor(produits) {
//   produits.forEach((produit) => {});
// }

// function produitQuantity() {}

// function produitTotalAmount() {}

// function addToCart() {}
