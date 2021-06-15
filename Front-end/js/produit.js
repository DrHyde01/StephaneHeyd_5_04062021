// Récupérer le produit via la même méthode que dans index.JS, mais via l'ID présente dans l'URL
import products from "./main.js";

const urlParams = new URLSearchParams(window.location.search); // On cible l'url de la page
const urlID = urlParams.get("id"); // Puis l'ID renseigné dedans

const getCameras = async function () {
  // Fonction créé pour récupérer les articles disponibles
  await fetch("http://localhost:3000/api/cameras/" + urlID) // En rajoutant la variable urlID on demande que le produit lié à l'ID
    .then((response) => response.json())

    .then((data) => {
      let cameras = new products(
        data._id,
        data.description,
        data.imageUrl,
        data.customize,
        data.name,
        data.price
      );

      cameras.displayArticle();
    })
    .catch(function (response) {
      alert("Erreur !");
    });
};

getCameras(); // On appelle la fonction
