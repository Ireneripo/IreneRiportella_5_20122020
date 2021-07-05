//récupération de l'ID de l'ourson de la page
let params = new URL(window.location).searchParams;
let produit = params.get("id");
// console.log(produit);

fetch(`http://localhost:3000/api/teddies/${produit}`)
  .then((data) => {
    return data.json();
  })
  .then((produit) => {
    // console.log(produit);
    displayProduct(produit);
  })
  .catch((error) => {
    console.log(error);
  });

//création de la structure HTML du produit

function displayProduct(produit) {
  const containerProduit = document.querySelector("#containerproduit");
  const price = produit.price / 100 + " €";
  containerproduit.innerHTML += `<div class="containerproduit">
          <img class="image" src="${produit.imageUrl}" alt="image d'un ourson" />
          <div class="info">
            <h3 class="titre">${produit.name}</h3>
            <p class="description">${produit.description}</p>
            <select name="couleur" id="couleur">
              <option class="label">Sélectionnez la couleur de votre teddy</option>
            </select></br>  
            <select name="quantité" id="quantite"></select>
            <h4 class="price">${price}</h4>
            <button class="addtocart" type="submit" >Ajouter au panier</button>
          </div>
        </div>`;
  // console.log(containerProduit);

  //Sélection de la couleur du produit
  const colors = produit.colors;
  // console.log(colors);
  colors.forEach(function (color) {
    const couleur = document.querySelector("#couleur");
    couleur.insertAdjacentHTML("beforeend", `<option>${color}</option>`);
  });
}

// function selectColor(colors) {
//   produit.colors.forEach(function (color) {
//     const couleur = document.querySelector("#couleur");
//     couleur.innerHTML += `<option>${colors}</option>`;
//   });
// }

//création choix couleur produit

// function produitQuantity() {}

// function produitTotalAmount() {}

// function addToCart() {}
