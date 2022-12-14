///console.log("arrivée sur la page produit");
// Fonction auto appelée
(async function () {
  // Récupérer l'id du kanap dans une url
  let productId = getProductId();
  ///console.log("productId :", productId); //= vérif 1
  // fetch notre kanap
  let product = await getProduct(productId);
  ///console.log("product :", product); // vérif 2 si on l'a bien récup
  // complète les infos du kanap clické
  productPage(product);
})();
// Fonction qui permet de récupérer l'id via la console par l'objet "location" puis "location.href" puis "new URL(location.href)" puis "new URL(location.href).search" puis "new URL(location.href).searchParams.get("id") => qui donne juste l'id.
function getProductId() {
  return new URL(location.href).searchParams.get("id");
}

// Copie de getKanap + concaténation "productId"
async function getProduct(productId) {
  try {
    let res = await fetch(`http://localhost:3000/api/products/${productId}`);
    let productDatas = await res.json();
    ///console.log("productDatas :", productDatas); // vérif récup des données de l'article
    return productDatas;
  } catch (error) {
    alert("Oups! Une erreur s'est produite, lors du chargement de la page. Vous allez être redirigé sur la page d'Accueil...");
    window.location.href = "index.html";
  }
}

function productPage(product) {
  // = tout ce qui est à l'interieur du fetch
  let altTxt = product.altTxt;
  let colors = product.colors;
  let description = product.description;
  let imageUrl = product.imageUrl;
  let name = product.name;
  let price = product.price;
  let _id = product._id;
  // Plus élégant, le destructuring : let { altTxt, colors, description, imageUrl, name, price } = kanap  // + _id pas nécessaire

  makePageTitle(name);
  makeImage(imageUrl, altTxt);
  makeTitle(name);
  makePrice(price);
  makeDescription(description);
  makeColors(colors);
}

function makePageTitle(name) {
  let pageTitle = document.querySelector("head title");
  pageTitle.textContent = name;
}

function makeImage(imageUrl, altTxt) {
  let image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  let parent = document.querySelector(".item__img");
  parent.appendChild(image);
}

function makeTitle(name) {
  let h1 = document.querySelector("#title");
  h1.textContent = name;
}

function makePrice(price) {
  let span = document.querySelector("#price");
  span.textContent = price;
}
function makeDescription(description) {
  let p = document.querySelector("#description");
  p.textContent = description;
}
function makeColors(colors) {
  let select = document.querySelector("#colors");

  colors.forEach(color => {
    let option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    select.appendChild(option);
  });
}

// button
let button = document.querySelector("#addToCart");
button.addEventListener("click", addBasket);

function addBasket() {
  // récup des données qui peuvent être modifiées
  let colorsOption = document.querySelector("#colors").value;
  let numberSelect = document.querySelector("#quantity").value;
  //si un des 2 est vide stop(:return), sinon saveOrder + redirectToCart
  if (isOrderInvalid(colorsOption, numberSelect)) return;
  saveBasket(colorsOption, numberSelect);
  redirectToCart();
  // vérif en désactivant //redirectToCart() :
  //console.log("colorsOption et numberSelect :", colorsOption, numberSelect)
}

/******************************** Gestion du LocalStorage **********************************/
function saveBasket(colorsOption, numberSelect) {
  let productId = getProductId();
  let basket = JSON.parse(localStorage.getItem("basket")) || {};
  let colorIndex = basket[productId]?.findIndex(
    (item) => item.color === colorsOption
  );
  console.log(colorIndex !== -1); // return true ou false si la couleur est stockée ou pas
  if (basket[productId]) {
    if (colorIndex !== -1) {
      //si la couleur est présente
      // (== -1) : couleur non stockée
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
  console.log("basket :", basket); // vérif en désactivant redirectToCart()
}
// Rappel :
// let colorIndex = basket[productId]?.findIndex((item) => item.color === colorsOption);
// if (colorIndex != -1) {...}

function isOrderInvalid(colorsOption, numberSelect) {
  if (
    colorsOption == null ||
    colorsOption === "" ||
    numberSelect == null ||
    numberSelect <= 0 ||
    numberSelect > 100
  ) {
    alert("Avant d'ajouter un canapé à votre panier, veuillez sélectionner la couleur souhaitée ainsi qu'une quantité ne pouvant excéder 100.");
    return true; // pour rester sur la page = stop
  }
}

function redirectToCart() {
  window.location.href = "cart.html";
}
