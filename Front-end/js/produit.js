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

// Mise en place du panier
let orderBtn = document.querySelector(".btn-order"); // On cible le bouton "ajouter au panier"

orderBtn.addEventListener("click", () => {

let newArticle = { // Objet créé pour regrouper les informations qui seront affichées dans le panier
  id: cameras.id,
  name: cameras.name,
  price: cameras.price / 100 + "€",
  lense: cameras.selectCustomization,
  number: quantity,
};
console.log(newArticle)
});



