//IIFE (Immediately Invoked Function Expression)
(async function () {
  const products = await getProducts();

  displayProducts(products);
})();

//Fonction qui permet de récupérer les produits dans l'API

function getProducts() {
  //Décaration de l'URL de l'API avec fetch

  return (
    fetch("http://localhost:3000/api/teddies/")
      //Les promesses

      .then(function (data) {
        return data.json();
      })

      .then(function (products) {
        return products;
      })

      // En cas d'erreur

      .catch(function (error) {
        alert(error);
      })
  );
}

//Affichage des produits dynamiquement

function displayProducts(products) {
  // console.log(products);
  products.forEach(function (produit) {
    // console.log(produit);
    const container = document.querySelector("#container");
    const price = produit.price / 100 + " €";
    container.insertAdjacentHTML(
      "beforeend",
      `<div class="carte">
    <img class="image" src="${produit.imageUrl}" alt="image d'un ourson">
    <div class="content">
      <h3 class="titre">${produit.name}</h3>
      <p class="description">${produit.description}</p>
      <div class="bottom-carte">
        <h4 class="prix">${price}</h4>
        <a href="produit.html?id=${produit._id}" "button="click" class="btn">Voir produit</a>
      
      </div>
    </div>
  </div>`
    );

    // console.log(container);
  });
}
