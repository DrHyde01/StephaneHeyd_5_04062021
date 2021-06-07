const getCameras = async function () {
  // Fonction créé pour récupérer les articles disponibles
  await fetch("http://localhost:3000/api/cameras") // On récupère les articles de l'API
    .then(function (response) {
      return response.json(); // Si l'API répond, un fichier .json est retourné
    })
    .then(function (data) {
      let cameras = data;
      console.log(cameras); // Afficher la liste des articles dans la console

      for (let camera of cameras) { // On utilise ici une boucle pour parcourir le tableau des articles

        //On créé notre structure html qui acceuillera les données du tableau
        const cameraList = document.querySelector(".itemsList"); 

        const cameraBox = document.createElement("itemBox");
        cameraList.appendChild(cameraBox);
        cameraBox.className = "card col-4 text-center cameraContainer"; // On y intègre également les classes utilitaires Bootstrap

        // Création d'un contenu cliquable vers la page du produit concerné
        const cameraLink = document.createElement("a");
        cameraLink.href = "produit.html?id" + camera._id;
        cameraBox.appendChild(cameraLink);
        cameraLink.setAttribute("title", "Acheter la caméra " + camera.name); //Ajout d'une info-bulle
        cameraLink.className = "productLink text-decoration-none";

        // Ajout des images
        const cameraImg = document.createElement("img");
        cameraLink.appendChild(cameraImg);
        cameraImg.setAttribute("src", camera.imageUrl);
        cameraImg.setAttribute("alt", "Camera" + camera.name);
        cameraImg.setAttribute("title", "Camera " + camera.name);
        cameraImg.className = "card-img cameraImg";

        // Ajout du nom de l'article
        const cameraName = document.createElement("h3");
        cameraLink.appendChild(cameraName);
        cameraName.textContent = camera.name;
        cameraName.className = "card-title";

        // Ajout de la description
        const cameraDetail = document.createElement("p");
        cameraBox.appendChild(cameraDetail);
        cameraDetail.textContent = camera.description;
        cameraDetail.className = "card-text";

        // AJout du prix
        const cameraPrice = document.createElement("p");
        cameraBox.appendChild(cameraPrice);
        cameraPrice.textContent = camera.price / 100 + " €"; // Rendre le prix plus réaliste et rajout d'une devise
      }
    })
    .catch(function (response) {
      alert("Erreur !"); // Sinon une erreur s'affiche à la place
    });
};

getCameras(); // On appelle la fonction
