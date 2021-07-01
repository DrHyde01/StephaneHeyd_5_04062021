import products from "./main.js"; // On récupère la class products du fichier main

// Appel de l'API --------------------------------------------------------------------------------------------------------
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
        data[i].lenses || data[i].colors || data[i].varnish, // Les options seront sélectionnées en fonction de l'API demandée
        data[i].name,
        data[i].price
      );
      //console.table(data)
      cameras.displayProducts(); // Et pour chaque article la structure html est récupérée
    }
  })
  .catch((error) => {
    // Affichage d'une erreur si l'API ne répond pas
    alert("Erreur !", error);
  });
