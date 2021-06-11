import products from "./main.js";
const getCameras = async function () {
  // Fonction créé pour récupérer les articles disponibles
  await fetch("http://localhost:3000/api/cameras") // On récupère les articles de l'API
    .then((response) => response.json()) // La promesse d'un fichier JSON si l'API répond

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
      // Si l'API ne répond pas un message d'erreur est retourné
      alert("Erreur !");
    });
};

getCameras(); // On appelle la fonction
