// récupération de l'id de la commande
let orderId = localStorage.getItem("orderId");
console.log(orderId);

// récupération du prix total de la commande
let totalPrice = localStorage.getItem("totalPrice");
console.log(totalPrice);

const confirmationMessage = document.querySelector(".order-summary");
confirmationMessage.insertAdjacentHTML(
  "beforeend",
  `<p>Merci !</p>
      <p>Votre commande numéro ${orderId} a bien été prise en compte pour un total de ${totalPrice} €.</p>`
);

// Effacer localStorage
localStorage.clear();
