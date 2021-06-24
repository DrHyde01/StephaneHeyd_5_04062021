// Déclaration de variables qui doivent être dispoibles sur l'ensemble de la page
let cartTable = document.querySelector(".cartTable");
let cartForm = document.querySelector(".formContainer");

let footerCheckoutBtn = document.createElement("button");

let totalPrice = [];

cartForm.style.display = "none"; // Le formulaire ne doit être affiché par défaut

createCartArray();

// Mise en place du panier sous forme d'un tableau --------------------------------------------------------
function createCartArray() {
  cartTable.innerHTML = ""; // Le tableau est vide tant que le panier l'est

  let cart = JSON.parse(localStorage.getItem("articleStored")) || [];
  if (cart.length > 0) {
    totalPrice = 0;

    let tableHead = document.createElement("thead");
    let headName = document.createElement("th");
    let headOption = document.createElement("th");
    let headQuantity = document.createElement("th");
    let headUniquePrice = document.createElement("th");
    let headTotalPrice = document.createElement("th");
    let deleteArticle = document.createElement("th");
    let tableFooter = document.createElement("tfoot");
    let tableFooterLine = document.createElement("td");
    let footerTotal = document.createElement("th");
    let footerCheckout = document.createElement("th");

    headName.classList.add("text-center");
    headOption.classList.add("text-center");
    headQuantity.classList.add("text-center");
    headUniquePrice.classList.add("text-center");
    headTotalPrice.classList.add("text-center");
    deleteArticle.classList.add("text-center");
    footerCheckoutBtn.classList.add("btn", "btn-success", "btn-small");

    tableFooterLine.setAttribute("align", "right"); // Ajustement pour la ligne "total
    tableFooterLine.setAttribute("colspan", "6");

    headName.textContent = "Nom";
    headOption.textContent = "Objectif";
    headQuantity.textContent = "Quantité";
    headUniquePrice.textContent = "Prix unitaire";
    headTotalPrice.textContent = "Prix total";
    deleteArticle.textContent = "";
    footerCheckoutBtn.textContent = "Commander";

    cartTable.appendChild(tableHead);
    cartTable.appendChild(tableFooter);
    tableHead.appendChild(headName);
    tableHead.appendChild(headOption);
    tableHead.appendChild(headQuantity);
    tableHead.appendChild(headUniquePrice);
    tableHead.appendChild(headTotalPrice);
    tableHead.appendChild(deleteArticle);
    tableFooter.appendChild(tableFooterLine);
    tableFooterLine.appendChild(footerTotal);
    tableFooterLine.appendChild(footerCheckout);
    footerCheckout.appendChild(footerCheckoutBtn);

    let tableBody = document.createElement("tbody"); // On rajoute une ligne au tableau pour chaque article ajouté
    for (let i = 0; i < cart.length; i++) {
      tableBody.appendChild(createArrayLine(cart[i], i));
      totalPrice += cart[i].price * cart[i].number;
    }

    footerTotal.textContent = "Total : " + totalPrice + " €";
    console.log(totalPrice);

    cartTable.appendChild(tableBody);

    function createArrayLine(item, i) {
      let articleIndex = i;
      let articleLine = document.createElement("tr");

      let lineName = document.createElement("td");
      let lineOption = document.createElement("td");
      let lineQuantity = document.createElement("td");
      let quantityLess = document.createElement("button");
      let quantityNumber = document.createElement("p");
      let quantityMore = document.createElement("button");
      let lineUniquePrice = document.createElement("td");
      let lineTotalPrice = document.createElement("td");
      let lineDelete = document.createElement("td");

      lineName.classList.add("text-center");
      lineOption.classList.add("text-center");
      lineQuantity.classList.add(
        "align-middle",
        "d-flex",
        "justify-content-around",
        "align-items-center"
      );
      quantityLess.classList.add(
        "quantity-button",
        "btn",
        "btn-sm",
        "btn-outline-secondary"
      );
      quantityNumber.classList.add("text-center", "m-0");
      quantityMore.classList.add(
        "quantity-button",
        "btn",
        "btn-sm",
        "btn-outline-secondary"
      );
      lineUniquePrice.classList.add("text-center");
      lineTotalPrice.classList.add("text-center");
      lineDelete.classList.add("text-center");

      lineName.textContent = item.name;
      lineOption.textContent = item.lense;
      quantityNumber.textContent = item.number;
      quantityLess.textContent = "-";
      quantityMore.textContent = "+";
      lineUniquePrice.textContent = item.price + " €";
      lineTotalPrice.textContent = item.price * item.number + " €";
      lineDelete.innerHTML =
        "<button type='button' class='btn btn-danger btn-sm'><i class='fas fa-trash-alt'></i></button>";

      tableBody.appendChild(articleLine);
      articleLine.appendChild(lineName);
      articleLine.appendChild(lineOption);
      articleLine.appendChild(lineQuantity);
      lineQuantity.appendChild(quantityLess);
      lineQuantity.appendChild(quantityNumber);
      lineQuantity.appendChild(quantityMore);
      articleLine.appendChild(lineUniquePrice);
      articleLine.appendChild(lineTotalPrice);
      articleLine.appendChild(lineDelete);

      // Fonctions permettant de rajouter ou supprimer des éléments du panier -----------------------------

      quantityLess.addEventListener("click", () => {
        // Enlever l'exemplaire d'un article
        if (item.number > 1) {
          // Uniquement si il y a plus d'un article
          cart[i].number--;
          localStorage.setItem("articleStored", JSON.stringify(cart)); // Met à jour le localStorage
          createCartArray(); // Recharge le tableau avec les nouvelles valeurs
          cartAddWidget(); // idem pour le widget
        }
      });

      quantityMore.addEventListener("click", () => {
        // Rajouter l'exemplaire d'un article
        cart[i].number++;
        localStorage.setItem("articleStored", JSON.stringify(cart));
        createCartArray();
        cartAddWidget();
      });

      lineDelete.addEventListener("click", () => {
        // Supprimer totalement un article
        cart.splice(articleIndex, 1); // Supprime un élement à partir de l'index
        localStorage.setItem("articleStored", JSON.stringify(cart));
        createCartArray();
        cartAddWidget();
      });

      // console.log([item.name, item.price, item.number]); // -> item bien retrouvé, plus qu'à l'afficher dans le tableau ...
      return articleLine;
    }
  } else {
    // Un message apparaît si le panier est vide
    cartTable.innerHTML =
      "<p class='text-center'>Oops ! Il semblerait que celui-ci soit vide.";
    cartForm.innerHTML = ""; // Le formulaire n'apparaît pas non plus
  }
}

// Mise en place du formulaire de commande ----------------------------------------------
function getFormData() {
  let products = [];
  for (let i = 0; i < cart.length; i++) {
    // Itération du nombre d'articles par ID, pour l'envoi au serveur
    for (let j = 0; j < cart[i].number; j++) {
      products.push(cart[i].id);
    }
  }

  let firstName = document.getElementById("formFirstName").value; // On cible les données du formulaire
  let lastName = document.getElementById("formLastName").value;
  let address = document.getElementById("formAddress").value;
  let city = document.getElementById("formCity").value;
  let email = document.getElementById("formEmail").value;

  let contact = {
    // Création d'un object contact en prévision de son envoi au serveur
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  };

  sendFormData({ products, contact }); // Appel de la formule ci-dessous en prenant comme arguments les articles commandées et les infos du formulaire
}

function sendFormData(data) {
  // Envoi de products et contact au serveur via la méthode POST
  fetch(apiURL + "order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((response) => {
      localStorage.setItem("articleStoredConfirm", JSON.stringify(response)); // Le retour de l'API est placé dans le LocalStorage
      localStorage.setItem("articleStored", JSON.stringify([])); // Ainsi que la liste des articles commandés
      localStorage.setItem('totalPrice', totalPrice); // On y rajoute le prix total pour l'utiliser sur la page de confirmation
      window.location.href = "confirmation.html"; // La page de confirmation est chargée
    })
    .catch((error) => {
      alert("Erreur !", error);
    });
}

footerCheckoutBtn.addEventListener("click", () => {
  // Le formulaire apparaît lorsqu'on clique sur le bouton "commander"
  cartForm.style.display = "block";
});

cartForm.addEventListener("submit", evnt => {
  // Lorsqu'on clique sur le bouton du formulaire les données sont
  evnt.preventDefault();
  getFormData();
});
