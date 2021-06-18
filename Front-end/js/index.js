import products from "./main.js"; // On récupère la class products du fichier main

const apiURL = "http://localhost:3000/api/cameras/";

fetch(apiURL) // On récupère les articles de l'API
  .then((response) => response.json()) // La promesse d'un fichier JSON si l'API répond

  .then((data) => {
    // Et celle d'en récupérer le contenu
    for (let i = 0; i < data.length; i++) {
      // Boucle créé pour itérer chaque article
      let cameras = new products( // Création d'une nouvelle instance afin de créer de nouveaux objets
        data[i]._id,
        data[i].description,
        data[i].imageUrl,
        data[i].lenses,
        data[i].name,
        data[i].price
      );

      cameras.displayProducts(); // Et pour chaque article la structure html est récupérée
    }
  })
  .catch((error) => { // Affichage d'une erreur si l'API ne répond pas
    alert("Erreur !", error);
  });
