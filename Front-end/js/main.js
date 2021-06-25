// Ici nous créons une classe products pour rendre notre script plus maintenable -----------------------------------
class products {
  constructor(id, description, imageUrl, customize, name, price) {
    // Le constructor sera appelé lors d'une nouvelle instance
    this.id = id;
    this.description = description;
    this.imageUrl = imageUrl;
    this.customize = customize;
    this.name = name;
    this.price = price;
    this.selectCustomization = customize[0];
  }

  // Déclaration de fonctions pour le contenu html / css des différentes pages --------------------------------------

  displayProducts() {
    //On créé notre structure html qui acceuillera les données de la page d'acceuil
    let cameraList = document.querySelector(".itemsList"); // MODIFIER NOM VARIABLES par PRODUCTS !
    let cameraBox = document.createElement("div");
    cameraList.append(cameraBox);
    cameraBox.className = "card col-md-4  m-2 p-3 text-center cameraBox"; // On y intègre également les classes utilitaires Bootstrap

    // Création d'un contenu cliquable vers la page du produit concerné
    let cameraLink = document.createElement("a");
    cameraLink.href = "produit.html?id=" + this.id;
    cameraBox.append(cameraLink);
    cameraLink.setAttribute("title", "Acheter la caméra " + this.name); //Ajout d'une info-bulle
    cameraLink.className = "cameraLink text-decoration-none";

    // Ajout des images
    let cameraImg = document.createElement("img");
    cameraLink.append(cameraImg);
    cameraImg.setAttribute("src", this.imageUrl);
    cameraImg.setAttribute("alt", "Camera" + this.name);
    cameraImg.setAttribute("title", "Camera " + this.name);
    cameraImg.className = "card-img cameraImg";

    // Ajout du nom de l'article
    let cameraName = document.createElement("h3");
    cameraLink.append(cameraName);
    cameraName.textContent = this.name;
    cameraName.className = "card-title m-3";

    // Ajout de la description
    let cameraDetail = document.createElement("p");
    cameraLink.append(cameraDetail);
    cameraDetail.textContent = "Voir le détail";
    cameraDetail.className = "btn btn-primary";

    // AJout du prix
    let cameraPrice = document.createElement("p");
    cameraBox.append(cameraPrice);
    cameraPrice.textContent = this.price / 100 + " €"; // Rendre le prix plus réaliste et rajout d'une devise
  }

  displayArticle() {
    //Structure html / css pour l'affiche individuel d'un article sur la page produit
    let articleContainer = document.querySelector(".itemContainer");

    let articleBox = document.createElement("div");
    articleContainer.append(articleBox);
    articleBox.className =
      "col-12 col-md-10 m-4 p-3 d-flex justify-content-center flex-wrap flex-md-nowrap itemBox"; // On y intègre également les classes utilitaires Bootstrap

    let imgBox = document.createElement("div");
    articleBox.append(imgBox);
    imgBox.className = "col-md-6 m-3 d-flex align-items-center";
    let articleImg = document.createElement("img");
    imgBox.append(articleImg);
    articleImg.setAttribute("src", this.imageUrl);
    articleImg.setAttribute("alt", "Camera" + this.name);
    articleImg.setAttribute("title", "Camera " + this.name);
    articleImg.className = "img-thumbnail articleImg";

    let articleTextBox = document.createElement("div");
    articleBox.append(articleTextBox);
    articleTextBox.className =
      "articleTextBox p-4 d-flex flex-column justify-content-around";

    // Ajout du nom de l'article
    let articleName = document.createElement("h3");
    articleTextBox.append(articleName);
    articleName.textContent = this.name;

    // Ajout de la description
    let articleDetail = document.createElement("p");
    articleTextBox.append(articleDetail);
    articleDetail.textContent = this.description;

    // AJout du prix
    let articlePrice = document.createElement("p");
    articleTextBox.append(articlePrice);
    articlePrice.textContent = this.price / 100 + " €";

    // Ajout du menu déroulant
    let formOptions = document.querySelector(".form-group");
    articleTextBox.append(formOptions);
    let articleOptions = document.querySelector(".form-select");
    formOptions.append(articleOptions);

    articleOptions.addEventListener("change", () => {
      this.selectCustomization = this.customize[articleOptions.selectedIndex];
    });

    // Utilisaton d'une boucle pour afficher les options disponibles en fonction de l'article affiché
    for (let i = 0; i < this.customize.length; i++) {
      let articleOption = document.createElement("option");
      articleOption.value = this.customize[i];
      articleOption.textContent = this.customize[i];
      articleOptions.append(articleOption);
    }

    // Ajout du bouton panier
    let articleAdd = document.querySelector(".btn-order");
    articleTextBox.append(articleAdd);
  }
}

export default products;
