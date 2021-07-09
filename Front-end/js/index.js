import products from "./main.js"; // On récupère la class products du fichier main 

// Appel de l'API ---------------------------------------------------------------------------------------------------------------------------------------------
fetch(apiURL) // On appelle la méthode fetch avec l'URL de notre API comme argument
  .then((response) => response.json()) // Fetch nous renvoie une promise, si l'API répond then() sera exécutée, ici pour récupérer le résultat via un JSON

  .then((data) => { // Et ensuite le résultat sera manipulé afin d'être exploitable pour notre application 
    for (let i = 0; i < data.length; i++) {
      // Boucle crée pour itérer chaque produit disponible
      let cameras = new products( // Création d'une nouvelle instance afin de pouvoir récuperer chaque paramètres de nos produits,et pouvoir les réutiliser  
        data[i]._id,
        data[i].description,
        data[i].imageUrl,
        data[i].lenses || data[i].colors || data[i].varnish, // Les options seront sélectionnées en fonction de l'API demandée
        data[i].name,
        data[i].price
      );
      //console.table(cameras)
      cameras.displayProducts(); // Et pour chaque produit la structure html / css sera appliquée
    }
  })

  .catch((error) => { // Si l'API ne répondu pas la promise appelera catch() afin d'afficher ici un message d'erreur
    alert("Impossible de récupérer la liste de nos produits", error);
  });
