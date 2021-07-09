import products from "./main.js"; // On récupère la class products du fichier main

// Déclaration des paramètres URL à récupérer pour l'id --------------------------------------------------------------------------------
const urlParams = new URLSearchParams(window.location.search); // On cible l'url de la page
const urlID = urlParams.get("id"); // Puis l'ID renseigné en paramètre

// Variables déclarées en prévision du panier ------------------------------------------------------------------------------------------
let cameras; 
let quantity = 1;

// Appel de l'API ----------------------------------------------------------------------------------------------------------------------
fetch(apiURL + urlID) // En rajoutant la variable urlID on demande uniquement le produit lié à l'ID
  .then((response) => response.json())

  .then((data) => {
    cameras = new products(
      data._id,
      data.description,
      data.imageUrl,
      data.lenses || data.colors || data.varnish, // Les options seront sélectionnées en fonction de l'API demandée
      data.name,
      data.price
    );
    //console.table(cameras);
    cameras.displayArticle();
  })

  .catch((error) => {
    alert("Impossible de récupérer les informations du produit", error);
  });

// Mise en place d'éléments permettant l'ajout d'articles au panier ---------------------------------------------------------------------------------------------

// Gestion des boutons permettant de choisir le nombre d'articles
let buttonLess = document.getElementById("quantityLess"); // Ce bouton soustraie de 1 si la quantité est supérieure à 1
buttonLess.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    document.getElementById("quantityNumber").innerHTML = quantity;
    document.getElementById("quantityName").style.display = "none";
  }
});

let buttonMore = document.getElementById("quantityMore"); // Et dans tout les cas on additionne 1 
buttonMore.addEventListener("click", () => {
  quantity++;
  document.getElementById("quantityNumber").innerHTML = quantity;
  document.getElementById("quantityName").style.display = "none";
});

// Gestion du bouton "ajouter au panier"
let orderBtn = document.querySelector(".btn-order"); // On cible le bouton "ajouter au panier"

// Cette fonction va rajouter l'article dans le Localstorage lors du clic sur le bouton "Ajouter au panier"
orderBtn.addEventListener("click", () => {
  let cartContent = JSON.parse(localStorage.getItem("articleStored")) || []; // On cible le localStorage et son tableau
  let newArticle = { // Objet créé pour sélectionner les informations produit qui seront à transmettre au localStorage
    id: cameras.id,
    name: cameras.name,
    price: cameras.price / 100,
    lense: cameras.selectCustomization,
    number: quantity
  };

  // On vérifie le tableau localStorage avant la transmission d'un article à ce premier
  let alreadyInCart = cartContent.findIndex(
    (item => item.id === newArticle.id && item.lense === newArticle.lense) // Arguments mis en place pour éviter les doublons pour les id et options identiques
    );

  if (alreadyInCart == -1) {  // Si l'article n'est pas encore présent (index à -1) on le rajoute au tableau
   cartContent.push(newArticle);
  } else {                    // Sinon on incrémente uniquement sa quantité
    cartContent[alreadyInCart].number += quantity; 
  }

  localStorage.setItem("articleStored", JSON.stringify(cartContent)); // Puis on rajoute les éléments concernés dans le localStorage / Panier 

  cartAddModal(); // Une modal s'affiche nous informant de l'ajout d'un article dans le panier
  cartAddWidget(); // Le widget est mis à jour en fonction du nombre d'articles rajoutés dans le panier
});
