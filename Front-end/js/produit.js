// Récupérer le produit via la même méthode que dans index.JS, mais via l'ID présente dans l'URL
import products from "./main.js";

// Déclaration des URL pour l'API
const urlParams = new URLSearchParams(window.location.search); // On cible l'url de la page
const urlID = urlParams.get("id"); // Puis l'ID renseigné dedans
const apiURL = "http://localhost:3000/api/cameras/" + urlID;

let cameras; // Variables déjà déclarées en prévision du panier
let quantity = 1;

await fetch(apiURL) // En rajoutant la variable urlID on demande que le produit lié à l'ID
  .then((response) => response.json())

  .then((data) => {
    cameras = new products(
      data._id,
      data.description,
      data.imageUrl,
      data.lenses,
      data.name,
      data.price
    );

    cameras.displayArticle();
  })
  .catch((error) => {
    alert("Erreur !", error);
  });

// Mise en place du panier ------------------------------------------------------------------------------
let orderBtn = document.querySelector(".btn-order"); // On cible le bouton "ajouter au panier"

orderBtn.addEventListener("click", () => {
  // La fonction va rajouter l'article dans le Localstorage lors du clic sur le bouton "Ajouter au panier"
  let cartContent = JSON.parse(localStorage.getItem("articleStored")) || []; // L'objet ci-dessous sera récupéré dans un tableau
  let newArticle = {
    // Objet créé pour sélectionner les informations les informations inhérentes à l'article sélectionné
    id: cameras.id,
    name: cameras.name,
    price: cameras.price / 100 ,
    lense: cameras.selectCustomization,
    number: quantity,
  };

  let alreadyInCart = cartContent.findIndex(
    // Renvoie l'index du premier élément du tableau
    ((item) => item.id == newArticle.id) && // Arguments mis en place pour ne pas créer de doublons pour les id et options identiques
      ((item) => item.lense == newArticle.lense)
  );

  if (alreadyInCart == -1) {
    // Si l'article n'est pas encore présent (index à -1) on le rajoute au tableau
    cartContent.push(newArticle);
  } else {
    cartContent[alreadyInCart].number += quantity; // Sinon on incrémente uniquement sa quantité
  }

  localStorage.setItem("articleStored", JSON.stringify(cartContent));

  cartAddWidget(); // Le widget est mis à jour en fonction du nombre d'articles au panier
});
