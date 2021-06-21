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
    let headPrice = document.createElement("th");
    let deleteArticle = document.createElement("th");

    headName.classList.add("text-center");
    headOption.classList.add("text-center");
    headQuantity.classList.add("text-center");
    headPrice.classList.add("text-center");
    deleteArticle.classList.add("text-center");

    headName.textContent = "Nom";
    headOption.textContent = "Objectif";
    headQuantity.textContent = "Quantité";
    headPrice.textContent = "Prix";
    deleteArticle.textContent = "";

    cartTable.appendChild(tableHead);
    tableHead.appendChild(headName);
    tableHead.appendChild(headOption);
    tableHead.appendChild(headQuantity);
    tableHead.appendChild(headPrice);
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
      let linePrice = document.createElement("td");
      let lineDelete = document.createElement("td");
    
      
      lineName.textContent = item.name;
      //console.log(item.name); -> item bien retrouvé, plus qu'à l'afficher dans le tableau ...
      return articleLine;

       
    }
  } else {
    // Un message apparaît si le panier est vide
    cartContainerEmpty.innerHTML =
      "<p class='text-center'>Oops ! Il semblerait que celui-ci soit vide.";
  }
}
