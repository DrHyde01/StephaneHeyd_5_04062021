// Ici nous créons une classe product qui pourra être utilisée sur l'ensemble de l'app
class products {
  constructor(id, description, imageUrl, customize, name, price) {
    this.id = id;
    this.description = description;
    this.imageUrl = imageUrl;
    this.customize = customize;
    this.name = name;
    this.price = price;
  }

  displayProducts() {
    //On créé notre structure html qui acceuillera les données du tableau
    let cameraList = document.querySelector(".itemsList");

    let cameraBox = document.createElement("itemBox");
    cameraList.append(cameraBox);
    cameraBox.className = "card col-4 text-center cameraContainer"; // On y intègre également les classes utilitaires Bootstrap

    // Création d'un contenu cliquable vers la page du produit concerné
    let cameraLink = document.createElement("a");
    cameraLink.href = "produit.html?id=" + this.id;
    cameraBox.append(cameraLink);
    cameraLink.setAttribute("title", "Acheter la caméra " + this.name); //Ajout d'une info-bulle
    cameraLink.className = "productLink text-decoration-none";

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
    cameraName.className = "card-title";

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
}

export default products;
