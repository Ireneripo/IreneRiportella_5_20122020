//récupération de l'ID de l'ourson de la page

// const url = window.location.search;
// const id = new URLSearchParams(url);
// const produit = id.get("id");
// console.log(produit);

let params = new URL(window.location).searchParams;
let produit = params.get("id");
console.log(produit);

fetch(`http://localhost:3000/api/teddies/${produit}`)
  .then((httpBodyResponse) => {
    return httpBodyResponse.json();
  })
  .then((produit) => {
    console.log(produit);
    displayProduct(produit);
  })
  .catch((error) => {
    console.log(error);
  });

//création de la structure HTML du produit

function displayProduct(produit) {
  const container = document.querySelector("#containerproduit");
  const price = produit.price / 100 + " €";
  containerproduit.innerHTML = `<div class="containerproduit">
          <img class="image" src="${produit.imageUrl}" alt="image d'un ourson" />
          <div class="info">
            <h3 class="titre">${produit.name}</h3>
            <p class="description">${produit.description}</p>
            <select name="couleur" id="couleur"></select>
            <select name="quantité" id="quantite"></select>
            <h4 class="price">${price}</h4>
            <button class="addtocart" type="submit" >Ajouter au panier</button>
          </div>
        </div>`;
  console.log(container);
}

//création choix produits
// function selectColor(produits) {
//   produits.forEach((produit) => {});
// }

// function produitQuantity() {}

// function produitTotalAmount() {}

// function addToCart() {}
