// Récupérer le produit via la même méthode que dans index.JS, mais via l'ID présente dans l'URL
import products from "./main.js";
const urlParams = new URLSearchParams(window.location.search); // On cible l'url de la page
const urlID = urlParams.get('id'); // Puis l'ID renseigné dedans
console.log(urlID);

const getCameras = async function () {
    // Fonction créé pour récupérer les articles disponibles
    await fetch("http://localhost:3000/api/cameras/" + urlID) // En rajoutant la variable urlID on demande que le produit lié à l'ID
      .then((response) => response.json())
  
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          let cameras = new products(
            data[i]._id,
            data[i].description,
            data[i].imageUrl,
            data[i].customize,
            data[i].name,
            data[i].price
          );
  
          cameras.displayProducts();
        }
        
      })
      .catch(function (response) {
        alert("Erreur !"); 
      });
  };
  
  getCameras(); // On appelle la fonction