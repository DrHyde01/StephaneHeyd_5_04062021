let orderID = document.getElementById("orderID");
let orderPrice = document.querySelector(".orderPrice");
let orderConfirm = JSON.parse(localStorage.getItem("articleStoredConfirm")) || [];
let orderConfirmPrice = localStorage.getItem("totalPrice");

orderID.textContent = orderConfirm.orderId;
orderPrice.textContent = orderConfirmPrice + " € ";


