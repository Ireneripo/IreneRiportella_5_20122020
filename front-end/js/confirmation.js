// récupération de l'id de la commande
let orderId = localStorage.getItem("orderId");
console.log(orderId);

// récupération du prix total de la commande
let totalCart = localStorage.getItem("totalCart");
console.log(totalCart);

const confirmationMessage = document.querySelector(".order-summary");
confirmationMessage.insertAdjacentHTML(
  "beforeend",
  `<p>Merci !</p>
      <p>Votre commande numéro ${orderId} a bien été prise en compte pour un total de ${totalCart} €.</p>`
);

// Effacer localStorage
localStorage.clear();
