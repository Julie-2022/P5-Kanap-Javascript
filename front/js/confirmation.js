console.log("Arrivée sur la page confirmation");

const orderId = getOrderId()
displayOrderId(orderId)
removeBasket()

// On va chercher l'OrderId dans l'Url
function getOrderId() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get("orderId")
}
console.log("orderId :",orderId)

// On l'affiche là où il faut
function displayOrderId(orderId) {
  const orderIdElement = document.getElementById("orderId")
  orderIdElement.textContent = orderId
}
// On vide le localStorage
function removeBasket() {
  const cache = window.localStorage
  cache.clear()
}