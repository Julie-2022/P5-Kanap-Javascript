///console.log("Arrivée sur la page confirmation");
let orderId = getOrderId();
displayOrderId(orderId);
removeBasket();

// On va chercher l'OrderId dans l'Url
function getOrderId() {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  return urlParams.get("orderId");
}
///console.log("orderId :", orderId);

// On l'affiche là où il faut
function displayOrderId(orderId) {
  let orderIdElement = document.getElementById("orderId");
  orderIdElement.textContent = orderId;
}

// On vide le localStorage
function removeBasket() {
  let cache = window.localStorage;
  cache.clear();
}
