let cartTable = document.querySelector(".cartTable");
let totalPrice;

createCartArray();

// Mise en place du panier sous forme d'un tableau --------------------------------------------------------
function createCartArray() {
  cartTable.innerHTML = "";
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
    let footerCheckoutBtn = document.createElement("button");

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
        "btn-outline-primary"
      );
      quantityNumber.classList.add("text-center", "m-0");
      quantityMore.classList.add(
        "quantity-button",
        "btn",
        "btn-sm",
        "btn-outline-primary"
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
  }
}
