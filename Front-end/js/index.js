function getArticles() { // Fonction créé pour récupérer les articles disponibles
  return fetch("http://localhost:3000/api/cameras") // On récupère les articles de l'API
    .then(function (response) {
      if (response.ok) {
        return response.json(); // Si l'API répond un fichier .json est retourné
      }
    })
    .then(function (value) {
      console.log(value); // Le contenu s'affiche dans la console
    })
    .catch(function (error) {
      console.log("error !"); // Sinon une erreur s'affiche à la place
    });
}

getArticles(); // On appelle la fonction créé précédement
