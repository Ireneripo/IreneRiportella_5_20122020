(async function () {
  const products = await getProducts();

  displayProducts(products);
})();

//Fonction qui permet de récupérer les produits dans l'API

function getProducts() {
  //Je déclare l'URL de l'API, j'utilise fetch

  return (
    fetch("http://localhost:3000/api/teddies/")
      //Les promesses

      .then(function (httpBodyResponse) {
        return httpBodyResponse.json();
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

function displayProducts(products) {
  // console.log(products);
  products.forEach(function (produit) {
    // console.log(produit);
    const container = document.querySelector("#container");
    const price = produit.price / 100 + " €";
    container.innerHTML += `<div class="carte">
    <img class="image" src="${produit.imageUrl}" alt="image d'un ourson">
    <div class="content">
      <h3 class="titre">${produit.name}</h3>
      <p class="description">${produit.description}</p>
      <div class="bottom-carte">
        <h4 class="prix">${price}</h4>
        <a href="produit.html?id=${produit._id}" "button="click" class="btn">Voir produit</a>
      </div>
    </div>
  </div>`;
    // console.log(container);

    //Ècoute de l'événement (click) pour que l'utilisateur sélectionne son produit et redirection vers la page produit

    // const btn = document.querySelector(".btn");

    // btn.addEventListener("click", function () {
    //   btn.href = "./produit.html?id=" + produit._id;
    //   btn.href = `./produit.html?id=${produit._id}`;
    // });
    // console.log(produit._id);
  });
}

// href="produit.html?id=${produit._id}"
