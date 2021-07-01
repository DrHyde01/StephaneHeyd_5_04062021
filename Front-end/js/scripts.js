// Déclaration de l'URL de l'API -------------------------------------------------------------------------------------
const apiURL = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
? 'http://localhost:3000/api/cameras/'
: 'https://onirico04062021.herokuapp.com/api/cameras';

// Déclaration de variables utilisées sur l'ensemble du site -----------------------------------------------------------
let cart = JSON.parse(localStorage.getItem("articleStored")) || []; // localStorage
let navCartWidget = document.querySelector(".cart-widget"); // Widget panier

// Création d'une fonction permettant d'afficher dans un widdget le nombre d'articles présents dans le panier -------------------
cartAddWidget();

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

// Fonction affichant une modal lors de l'ajout d'article au panier ----------------------------------------------------------
function cartAddModal() {
  let cartModal = document.querySelector(".modalCartAdd");
  cartModal.style.display = "block";
  setTimeout(() => {
    cartModal.style.display = "none";
  }, 1000);
}
