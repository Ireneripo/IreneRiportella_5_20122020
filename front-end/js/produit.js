//récupération de l'ID de l'ourson de la page
let params = new URL(window.location).searchParams;
let produitId = params.get("id");
// console.log(produit);

fetch(`http://localhost:3000/api/teddies/${produitId}`)
  .then((data) => {
    return data.json();
  })
  .then((produit) => {
    // console.log(produit);
    displayProduct(produit);
    addCartBtn();
  })
  .catch((error) => {
    console.log(error);
  });

//création de la structure HTML du produit

function displayProduct(produit) {
  const containerProduit = document.querySelector("#containerproduit");
  const price = produit.price / 100 + " €";
  containerProduit.insertAdjacentHTML(
    "beforeend",
    `<div class="containerproduit">
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

//Ajout du produit au panier
function addCartBtn() {
  const btnAddToCart = document.querySelector(".btn-add-to-cart");
  console.log(btnAddToCart);
  btnAddToCart.addEventListener("click", function (event) {
    event.preventDefault();
    addToCart();
  });
  function addToCart() {
    let localCart = localStorage.getItem("selectedProduct");
    if (localCart === null) {
      localCart = { [produitId]: 0 };
    } else {
      localCart = JSON.parse(localCart);
    }

    const quantity = document.querySelector("#quantite").value;
    console.log(quantity);
    localCart[produitId] += +quantity;

    localStorage.setItem("selectedProduct", JSON.stringify(localCart));
  }
}
