// Fonction auto appelée
(async function () {
  // Récupérer l'id du kanap dans une url
  const productId = getProductId();
  //console.log(productId) //= vérif 1
  // fetch notre kanap
  const product = await getProduct(productId);
  //console.log(product)// vérif 2 si on l'a bien récup
  // complète les infos du kanap clické
  productsData(product);
})();
// Fct qui permet de récupérer l'id via la console par l'objet "location" puis "location.href" puis "location.href" puis "new URL(location.href)" puis "new URL(location.href).get("id") => donne l'id.
function getProductId() {
  return new URL(location.href).searchParams.get("id");
}
// Copie de getKanap + concaténation "productId"
async function getProduct(productId) {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${productId}`);
    const products = await res.json();
    return products;
  } catch (error) {
    alert(error);
  }
}
function productsData(product) {
  // = tout ce qui est à l'interieur du fetch
  const altTxt = product.altTxt;
  const colors = product.colors;
  const description = product.description;
  const imageUrl = product.imageUrl;
  const name = product.name;
  const price = product.price;
  const _id = product._id;
  // Plus élégant: const { altTxt, colors, description, imageUrl, name, price } = kanap  // + _id pas nécessaire
  //
 
  makePageTitle(name);
  makeImage(imageUrl, altTxt);
  makeTitle(name);
  makePrice(price);
  makeDescription(description);
  makeColors(colors);
}
function makePageTitle(name) {
  const pageTitle = document.querySelector("head title");
  pageTitle.innerText = name;
}

function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector(".item__img");
  parent.appendChild(image);
}

function makeTitle(name) {
  const h1 = document.querySelector("#title");
  h1.innerText = name;
}

function makePrice(price) {
  const span = document.querySelector("#price");
  span.innerText = price;
}
function makeDescription(description) {
  const p = document.querySelector("#description");
  p.innerText = description;
}
function makeColors(colors) {
  const select = document.querySelector("#colors");

  colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.innerText = color;
    select.appendChild(option);
  });
}
// button
const button = document.querySelector("#addToCart");
button.addEventListener("click", productClick);

function productClick() {
  // récup des données qui peuvent être modifiées
  const colorsOption = document.querySelector("#colors").value;
  const numberSelect = document.querySelector("#quantity").value;
  //si un des 2 est vide stop(:return), sinon saveOrder + redirectToCart
  if (isOrderInvalid(colorsOption, numberSelect)) return;
  saveBasket(colorsOption, numberSelect);
  redirectToCart();
}

console.log("arrivée sur la page produit");
/******************************** Gestion du LocalStorage **************************************/
function saveBasket(colorsOption, numberSelect) {
  const productId = getProductId();
  let basket = JSON.parse(localStorage.getItem("basket")) || {};
  const colorIndex = basket[productId]?.findIndex(
    (item) => item.color === colorsOption
  );
  console.log(colorIndex !== -1);  // return true ou false si la couleur est stockée ou pas
  if (basket[productId]) {
    if (colorIndex !== -1) { //si la couleur est présente
      // === colorOption // != -1 : (-1) : couleur non stockée
      basket[productId][colorIndex].quantity =
        parseInt(basket[productId][colorIndex].quantity) +
        parseInt(numberSelect);
    } else {
      basket[productId].push({ color: colorsOption, quantity: numberSelect });
    }
  }
  if (basket[productId] == undefined) {
    basket[productId] = [];
    basket[productId].push({ color: colorsOption, quantity: numberSelect });
  }
  localStorage.setItem("basket", JSON.stringify(basket));
}
// Rappel :
// const colorIndex = basket[productId]?.findIndex((item) => item.color === colorsOption);
// if (colorIndex != -1) {...}

function isOrderInvalid(color, quantity) {
  if (color == null || color === "" || quantity == null || quantity <= 0) {
    alert("Please select a color and quantity");
    return true; // pour rester sur la page = stop
  }
}
function redirectToCart() {
  window.location.href = "cart.html";
}
