// Déclaration de l'URL de l'API en fonction de l'environnement -------------------------------------------------------------------------------------
const apiURL = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') 
? 'http://localhost:3000/api/cameras/' 
: 'https://orinoco.stefanheyd.com/api/cameras/';

// Déclaration de variables utilisées sur l'ensemble du site ----------------------------------------------------------------------------------------
let cart = JSON.parse(localStorage.getItem("articleStored")) || []; // Récupération du localStorage
let navCartWidget = document.querySelector(".cart-widget"); // On cible le widget panier

// Création d'une fonction permettant d'afficher dans un widdget le nombre d'articles présents dans le panier -----------------------------------------
function cartAddWidget() {
  cart = JSON.parse(localStorage.getItem("articleStored")) || []; // Pour une MAJ automatique du widget

  if (cart.length === 0) { // Si panier vide le widget n'apparaît pas
    navCartWidget.style.display = "none"; 
  } else {                 // Sinon il s'affiche avec le nombre d'articles présents
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
      count += cart[i].number;
    }
    navCartWidget.innerHTML = count;
    navCartWidget.style.display = "inline-block";
  }
}

// Fonction affichant un modal lors de l'ajout d'article au panier -----------------------------------------------------------------------------------
function cartAddModal() {
  let cartModal = document.querySelector(".modalCartAdd");
  cartModal.style.display = "block";
  setTimeout(() => { // Timeout obligatoire pour rendre l'affichage de la modal temporaire ! 
    cartModal.style.display = "none";
  }, 1000);
}

cartAddWidget(); // La fonction widget est appellée sur l'ensemble du site
