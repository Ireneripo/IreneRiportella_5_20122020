(async function () {
  const products = await getProducts();

  displayProducts(products);
})();

//Fonction qui permet de récupérer les produits dans l'API

function getProducts() {
  //On saisit l'URL de l'API, on utilise fetch

  return (
    fetch("http://localhost:3000/api/teddies")
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
  products.forEach(function (produit) {
    //On crée les éléments HTML

    let container = document.getElementById("container");

    let carte = document.createElement("div");

    let bottomCarte = document.createElement("div");

    let texteDiv = document.createElement("div");

    let image = document.createElement("img");

    let titre = document.createElement("h3");

    let description = document.createElement("p");

    let prix = document.createElement("h4");

    let btn = document.createElement("a");

    //On structure les éléments dans le HTML

    container.appendChild(carte);

    carte.appendChild(image);

    carte.appendChild(texteDiv);

    texteDiv.appendChild(titre);

    texteDiv.appendChild(description);

    texteDiv.appendChild(bottomCarte);

    bottomCarte.appendChild(prix);

    bottomCarte.appendChild(btn);

    //On donne des attributs à nos éléments (une classe par exemple)

    carte.setAttribute("class", "carte");

    image.setAttribute("class", "image");

    texteDiv.setAttribute("class", "content");

    titre.setAttribute("class", "titre");

    description.setAttribute("class", "description");

    bottomCarte.setAttribute("class", "bottom-carte");

    prix.setAttribute("class", "prix");

    btn.setAttribute("button", "click");

    btn.setAttribute("class", "btn");

    /*

       * On rend notre HTML dynamique, il récupère donc les informations des produits

       * depuis l'API pour les afficher ensuite

       */

    titre.textContent = produit.name;

    description.textContent = produit.description;

    prix.textContent = "Prix: " + produit.price + " €";

    image.src = produit.imageUrl;

    btn.textContent = "Voir produit";

    // ADDEVENTLISTENER

    btn.addEventListener("click", function () {
      btn.href = "./produit.html?id" + produit._id;
    });
  });
}
