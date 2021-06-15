import products from "./main.js"; // On récupère le tableau products du fichier main

const getCameras = async function () {
  // Fonction créé pour récupérer les articles disponibles et les afficher sur la page
  await fetch("http://localhost:3000/api/cameras") // On récupère les articles de l'API
    .then((response) => response.json()) // La promesse d'un fichier JSON si l'API répond

    .then((data) => {
      // Et celle d'en récupérer le contenu
      for (let i = 0; i < data.length; i++) {
        // Boucle créé pour itérer chaque article à partir de la class products
        let cameras = new products( // On appelle le constructor de la class
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
    .catch(function (response) {
      // Si l'API ne répond pas un message d'erreur est retourné
      alert("Erreur !");
    });
};

getCameras(); // On invoque enfin la fonction pour que les articles s'affichent sur notre page
