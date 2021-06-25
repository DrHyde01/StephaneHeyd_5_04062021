// On récupérère les informations necessaires pour l'affichage du message de confirmation
let orderID = document.getElementById("orderID");
let orderPrice = document.querySelector(".orderPrice");
let orderConfirmationOK = document.querySelector(".orderConfirmationSuccess");
let orderConfirmationNOK = document.querySelector(".orderConfirmationFail");
let orderConfirm = JSON.parse(localStorage.getItem("articleStoredConfirm")) || [];
let orderConfirmPrice = localStorage.getItem("totalPrice");

// Pour les afficher sur la page
orderID.textContent = orderConfirm.orderId;
orderPrice.textContent = orderConfirmPrice + " € ";

//Affichage d'un message en fonction de l'état du localStorage, si celui-ci est vide un message d'erreur apparaît
orderConfirmationNOK.style.display = "none";

if (orderConfirm.length == 0) {
  orderConfirmationOK.style.display = "none";
  orderConfirmationNOK.style.display = "block";
}

// Vidage du locaStorage une fois la page de confirmation chargée
localStorage.clear();
