//Création du formulaire de commande
const formulairepanier = document.querySelector("#formulairepanier");
formulairepanier.insertAdjacentHTML(
  "beforeend",
  `<form action="" method="post" class="formulairecommande">
<div class="forminfo">
  <label for="firstname">Prénom : </label>
  <input type="text" name="firstname" id="firstname" required />
</div>
<div class="forminfo">
  <label for="lastname">Nom : </label>
  <input type="text" name="lastname" id="lastname" required />
</div>
<div class="forminfo">
  <label for="address">Adresse : </label>
  <input type="text" name="address" id="address" required />
</div>
<div class="forminfo">
  <label for="postcode">Code Postal: </label>
  <input type="text" name="postcode" id="postcode" required />
</div>
<div class="forminfo">
  <label for="city">Ville : </label>
  <input type="text" name="city" id="city" required />
</div>
<div class="forminfo">
  <label for="email">Email: </label>
  <input type="email" name="email" id="email" required />
</div>
<div class="formsubmit">
  <input
    type="submit"
    value="Valider ma commande"
    class="validercommande"
  />
</div>
</form>`
);
