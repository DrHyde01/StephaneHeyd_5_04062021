let cartContainerEmpty = document.querySelector(".emptyCart");
let cartTable = document.querySelector(".cartTable");
let totalPrice;

createCartArray();

// Mise en place du panier sous forme d'un tableau --------------------------------------------------------
function createCartArray() {
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

    headName.classList.add("text-center");
    headOption.classList.add("text-center");
    headQuantity.classList.add("text-center");
    headUniquePrice.classList.add("text-center");
    headTotalPrice.classList.add("text-center");
    deleteArticle.classList.add("text-center");

    headName.textContent = "Nom";
    headOption.textContent = "Objectif";
    headQuantity.textContent = "Quantité";
    headUniquePrice.textContent = "Prix unitaire";
    headTotalPrice.textContent = "Prix total";
    deleteArticle.textContent = "";

    cartTable.appendChild(tableHead);
    tableHead.appendChild(headName);
    tableHead.appendChild(headOption);
    tableHead.appendChild(headQuantity);
    tableHead.appendChild(headUniquePrice);
    tableHead.appendChild(headTotalPrice);
    tableHead.appendChild(deleteArticle);

    let tableBody = document.createElement("tbody"); // On rajoute une ligne au tableau pour chaque article ajouté
    for (let i = 0; i < cart.length; i++) {
      tableBody.appendChild(createArrayLine(cart[i], i));
      totalPrice += cart[i].price * cart[i].number;
    }
     cartTable.appendChild(tableBody);

    function createArrayLine(item, i) {
      let articleIndex = i;
      let articleLine = document.createElement("tr");
      

      let lineName = document.createElement("td");
      let lineOption = document.createElement("td");
      let lineQuantity = document.createElement("td");
      let lineUniquePrice = document.createElement("td");
      let lineTotalPrice = document.createElement("td");
      let lineDelete = document.createElement("td");
      
      lineName.textContent = item.name;
      lineOption.textContent = item.lense;
      lineQuantity.textContent = item.number;
      lineUniquePrice.textContent = item.price + " €";
      lineTotalPrice.textContent = (item.price * item.number) + " €";
      lineDelete.innerHTML = "<button type='button' class='btn btn-danger btn-sm'><i class='fas fa-trash-alt'></i></button>";

      tableBody.appendChild(articleLine);
      articleLine.appendChild(lineName);
      articleLine.appendChild(lineOption);
      articleLine.appendChild(lineQuantity);
      articleLine.appendChild(lineUniquePrice);
      articleLine.appendChild(lineTotalPrice);
      articleLine.appendChild(lineDelete);
    
      
      
      // console.log([item.name, item.price, item.number]); // -> item bien retrouvé, plus qu'à l'afficher dans le tableau ...
      return articleLine;

       
    }
  } else {
    // Un message apparaît si le panier est vide
    cartContainerEmpty.innerHTML =
      "<p class='text-center'>Oops ! Il semblerait que celui-ci soit vide.";
  }
}
