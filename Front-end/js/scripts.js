// Création d'une fonction permettant d'afficher le nombre d'articles présents dans le panier -------------------

let cart = JSON.parse(localStorage.getItem("articleStored")) || [];
let navCartWidget = document.querySelector(".cart-widget");

function cartAddWidget() {
  cart = JSON.parse(localStorage.getItem("articleStored")) || []; // Récupération du localStorage

  if (cart.length === 0) { 
    navCartWidget.style.display = "none";
  } else {
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
      count += cart[i].number;
    }
    navCartWidget.innerHTML = count;
    navCartWidget.style.display = "inline-block";
  }
}

cartAddWidget();


