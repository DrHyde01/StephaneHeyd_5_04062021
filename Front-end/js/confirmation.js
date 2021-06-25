// On récupérère les informations necessaires à partir du localStorage
let orderID = document.getElementById("orderID");
let orderPrice = document.querySelector(".orderPrice");
let orderConfirm = JSON.parse(localStorage.getItem("articleStoredConfirm")) || [];
let orderConfirmPrice = localStorage.getItem("totalPrice");

// Pour les afficher sur la page
orderID.textContent = orderConfirm.orderId;
orderPrice.textContent = orderConfirmPrice + " € ";

// Vidage du locaStorage une fois la page de confirmation chargée
localStorage.clear();


