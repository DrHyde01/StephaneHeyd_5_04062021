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
let addArticle = {
  id: cameras.id,
  name: cameras.name,
  price: cameras.price,
  lense: cameras.lenses,
  number: quantity,
};

console.log(addArticle);
