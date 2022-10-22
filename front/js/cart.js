async function getAllProductsInfo(productsList) {
  let result = [];
  for (let product of productsList) {
    await fetch(`http://localhost:3000/api/products/${product}`)
      .then((res) => res.json())
      .then((info) => {
        result.push(info);
        console.log("result", result);
        console.log("info", info);
      });
  }
  return result;
}

async function main() {
  let basket = JSON.parse(localStorage.getItem("basket")) || {};
  console.log("basket", basket);
  let productsList = Object.keys(basket);

  console.log("productsList", productsList);
  console.log("Object.keys(basket)", Object.keys(basket));
  console.log("Object.values(basket)", Object.values(basket));
  console.log("object(basket)", Object(basket));
  console.log("object.entries(basket)", Object.entries(basket));
  console.log("localStorage", localStorage);

  let infos = await getAllProductsInfo(productsList);

  console.log("infos", infos);
  console.log("productsList", productsList);

  await addProductsToPage(infos, basket);
  //errorQuantityMessage(basket, infos) /************** doute ****** */
  // if (isOrderInvalid(infos, basket)) return;
  addTotalToPage(infos, basket);
  addTotalQuantity(infos, basket);
  updatePriceAndQuantity(infos, basket);
  deleteProduct(basket, infos);
  /******************** */
  //  if (IsFormInvalid(basket, infos, productsList)) return
  submitForm(basket, infos, productsList);
  //   document.getElementById("order").addEventListener('click', async function(e) {
  //     e.preventDefault();
  //     // 1. appel la fonction: Confirm et attend sont résultat grace au mot clés await
  //     await Confirm(basket, infos, productsList);

  // })

  // 2. appel la fonction: RegisterforConfirming et attend la fin de sont traitement grace au mot clés await
  //await RegisterforConfirming(basket, infos, productsList);

  //  const orderButton = document.querySelector("#order")
  //  orderButton.addEventListener("click", (e) => submitForm(e, basket, infos, productsList))
}
main();

// const orderButton = document.querySelector("#order")
// orderButton.addEventListener("click", (e) => submitForm(e))

async function addTotalQuantity(infos, basket) {
  totalQty = 0;
  for (let elem of Object.keys(basket)) {
    for (let color of basket[elem]) {
      totalQty += parseInt(color.quantity);
    }
  }
  let totalQuantity = document.querySelector("#totalQuantity");
  totalQuantity.innerText = totalQty;
}

async function addTotalToPage(infos, basket) {
  let total = 0;
  for (let elem of Object.keys(basket)) {
    let elemInfos = await infos.find((el) => el._id === elem);
    let productPrice = elemInfos.price;
    for (let color of basket[elem]) {
      total += color.quantity * productPrice;
    }
  }
  let totalQuantity = document.querySelector("#totalPrice");
  totalQuantity.innerText = total;
}

/*************************** */

function updatePriceAndQuantity(infos, basket) {
  //for (let elem of Object.keys(basket)) {
  let changeInputs = document.getElementsByClassName("itemQuantity");
  //console.log(changeInputs);
  Array.from(changeInputs).forEach((item) => {
    item.addEventListener("change", (event) => {
      event.preventDefault();
      console.log(item);
      choiceQty = Number(event.target.value);

      // On pointe le parent hiérarchique <article> de l'input "itemQuantity"
      let myArticle = event.target.closest("article");
      let colorMyArticle = myArticle.getAttribute("data-color");
      let idMyArticle = myArticle.getAttribute("data-id");

      // On récupère dans le localStorage l'élément (même id et même couleur) dont on veut modifier la quantité
      const colorIndex = basket[idMyArticle]?.findIndex(
        (item) => item.color === colorMyArticle
      );
if (isQtyInvalid(choiceQty, colorMyArticle, item)) return;

      if (colorIndex !== -1) {
        //si la couleur est présente
        // === colorMyArticle // != -1 : (-1) : couleur non stockée
        basket[idMyArticle][colorIndex].quantity = choiceQty;
        alert("La quantité de votre panier à été modifée");
      }
      localStorage.setItem("basket", JSON.stringify(basket));
//isQtyInvalid(basket, infos, choiceQty, colorMyArticle)
      addTotalToPage(infos, basket);
      addTotalQuantity(infos, basket);
      // errorQuantityMessage(basket, infos)
    });
  });
}

function isQtyInvalid(choiceQty) {//(choiceQty) != Number.isInteger(choiceQty)
  if (choiceQty == null || choiceQty <= 0 || choiceQty >= 100 ) {
    alert("La quantité d'un article choisi doit être comprise entre 1 et 100 et être un nombre entier.");    
    return true; // pour rester sur la page = stop
  }
}

function deleteProduct(basket, infos) {
  let deleteItem = document.querySelectorAll(".deleteItem");
  deleteItem.forEach((btnDelete) => {
    btnDelete.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("e", e);

      let thisArticle = e.target.closest("article");
      const colorThisArticle = thisArticle.getAttribute("data-color");
      const idThisArticle = thisArticle.getAttribute("data-id");
      console.log(thisArticle);
      console.log(idThisArticle, colorThisArticle);

      const IndexToDelete = basket[idThisArticle]?.findIndex(
        (x) => x.color === colorThisArticle
      );

      basket[idThisArticle].splice(IndexToDelete, 1);
      console.log(IndexToDelete !== -1);
      console.log("basket1", basket);

      localStorage.setItem("basket", JSON.stringify(basket));
      console.log(IndexToDelete !== -1);

      console.log(basket[idThisArticle] <= 1);
      /***** */
      deleteArticleFromPage(idThisArticle, colorThisArticle);
      deleteProductEmptyFromBasket(basket, idThisArticle);
      addTotalToPage(infos, basket);
      addTotalQuantity(infos, basket);
      basketEmptyMessage(basket, infos);
    });
  });
}

function deleteProductEmptyFromBasket(basket, idThisArticle) {
  if (basket[idThisArticle] <= 1) {
    console.log("jusque là tout va bien", basket[idThisArticle] <= 1);
    delete basket[idThisArticle];
    console.log("basket3", basket);
    localStorage.setItem("basket", JSON.stringify(basket));
  }
}

function basketEmptyMessage(basket) {
  //if (basket == {} || basket === null || basket.length === 0)
  if (Object.keys(basket) === null || Object.keys(basket).length === 0) {
    console.log("vide");
    localStorage.clear();
    alert("Votre panier est vide ! Vous allez être redirigé sur la page d'Accueil...");
    window.location.href = "index.html";
  }
}

function deleteArticleFromPage(idThisArticle, colorThisArticle) {
  const articleToDelete = document.querySelector(
    `article[data-id="${idThisArticle}"][data-color="${colorThisArticle}"]`
  );
  articleToDelete.remove();
}

async function addProductsToPage(infos, basket) {
  for (let elem of Object.keys(basket)) {
    let elemInfos = await infos.find((el) => el._id === elem);
    for (let color of basket[elem]) {
      // chercher dans le panier, la quantité et couleur commandées
      let displayArticle = document.querySelector("#cart__items");
      let article = document.createElement("article");
      article.classList.add("cart__item");
      article.dataset.id = elem; // au lieu de : elemInfos.id;
      article.dataset.color = color.color; // au lieu de : elemInfos.color;
      displayArticle.appendChild(article);
      let div = document.createElement("div");
      div.classList.add("cart__item__img");
      article.appendChild(div);
      let image = document.createElement("img");
      image.classList.add("cart__item__img");
      image.src = elemInfos.imageUrl;
      image.alt = elemInfos.altTxt;
      div.appendChild(image);
      let div2 = document.createElement("div");
      div2.classList.add("cart__item__content");
      article.appendChild(div2);
      let div3 = document.createElement("div");
      div3.classList.add("cart__item__content__description");
      div2.appendChild(div3);
      let kanapName = document.createElement("h2");
      kanapName.innerText = elemInfos.name;
      div3.appendChild(kanapName);
      let kanapColor = document.createElement("p");
      kanapColor.innerText = color.color;
      div3.appendChild(kanapColor);
      let KanapPrice = document.createElement("p");
      KanapPrice.innerText = elemInfos.price + " €";
      div3.appendChild(KanapPrice);
      let div4 = document.createElement("div");
      div4.classList.add("cart__item__content__settings");
      div2.appendChild(div4);
      let DivQuantity = document.createElement("div");
      DivQuantity.classList.add("cart__item__content__settings__quantity");
      div4.appendChild(DivQuantity);
      let p = document.createElement("p");
      p.innerText = "Qté : ";
      DivQuantity.appendChild(p);
      let input = document.createElement("input");
      input.type = "number";
      input.classList.add("itemQuantity");
      input.name = "itemQuantity";
      input.min = "1";
      input.max = "100";
      input.value = color.quantity; //|| newValue;

      DivQuantity.appendChild(input);
      let div6 = document.createElement("div");
      div6.classList.add("cart__item__content__settings__delete");
      //div6.addEventListener("click", () => deleteProduct(basket, infos, elem, color.color))

      div4.appendChild(div6);
      let deleteP = document.createElement("p");
      deleteP.classList.add("deleteItem");
      deleteP.textContent = "Supprimer";
      div6.appendChild(deleteP);
      /****************** Change Qty *************** */
      // input.addEventListener("change", (event) => {
      //  // console.log(event);
      //   let currentQuantity = color.quantity;
      //  // console.log(currentQuantity);
      //   const newValue = Number(input.value);
      //   const updateQuantity = parseInt((currentQuantity = newValue));
      //  // console.log(updateQuantity);
      //   color.quantity = updateQuantity;
      //  // console.table(basket);
      //   localStorage.setItem("basket", JSON.stringify(basket));
      //   alert("La quantité de votre panier à été modifée");
      //   addTotalQuantity(infos, basket);
      //   addTotalToPage(infos, basket);
      // });
    }
  }
}

/******************** Formulaire */
/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */
/******************* Formulaire ********* */

function isFormInvalid() {
  const form = document.querySelector(".cart__order__form");
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("Merci de remplir tous les champs du formulaire");
      return true;
    }
    return false;
  });
}

function emailInvalid() {
    const email = document.querySelector("#email").value
    let regex = /^[^. ?!:;,/\\/_-]([._-]?[a-z0-9])+[^.?!: ;,/\\/_-][@][a-z0-9]+[.][a-z][a-z]+$/
  if (regex.test(email) === false) {
        //alert("Merci d'entrer un email valide")
        emailErrorMsg.textContent = "Veuillez saisir une adresse email valide !";
        return true
    }
    return false
}

function firstNameInvalid() {
  const firstName = document.querySelector("#firstName").value
    const regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{2,}$/
  if (regex.test(firstName) === false) {
       // alert("Merci d'entrer un prénom valide")
       firstNameErrorMsg.textContent = "Veuillez renseigner un prénom valide !";
        return true
    }
    return
}

function lastNameInvalid() {
  const lastName = document.querySelector("#lastName").value
    const regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{2,}$/
  if (regex.test(lastName) === false) {
        //alert("Merci d'entrer un nom valide")
        lastNameErrorMsg.textContent = "Veuillez renseigner un nom valide !";
        return true
    }
    return
}

function addressInvalid() {
const address = document.querySelector("#address").value
    const regex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/
  if (regex.test(address) === false) {
      //alert("Merci d'entrer une adresse valide")
      addressErrorMsg.textContent = "Veuillez saisir une adresse valide !";
        return true
    }
    return
}

function cityInvalid() {
const city = document.querySelector("#city").value
    const regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{2,}$/
  if (regex.test(city) === false) {
        //alert("Merci d'entrer un nom de ville valide")
        addressErrorMsg.textContent = "Veuillez saisir une adresse valide !";
        return true
    }
    return
}


const boutonCommander = document.getElementById("order");

function submitForm(basket, infos, productsList) {
  //Ecoute du bouton Commander
  boutonCommander.addEventListener("click", (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    if (productsList.length === 0) alert("Veuillez ajouter des articles à votre panier avant de remplir le formulaire.");

    // if (productsList.length === 0) {
    //     alert("Merci d'ajouter des articles à votre panier")
    //     return
    // }

    const form = document.querySelector(".cart__order__form");
    console.log(form.elements, form);

    console.log(Object.keys(basket), "=", productsList);

    //Récupération des id des produits du panier, dans le localStorage
    let idProducts = [];
    for (let l = 0; l < productsList.length; l++) {
      idProducts.push(productsList[l]);
    }
    console.log("idProducts", idProducts);

    if (isFormInvalid()) return;
    if (emailInvalid()) return;
    if (firstNameInvalid()) return;
    if (lastNameInvalid()) return;
    if (addressInvalid()) return;
    if (cityInvalid()) return;

    // On créé un objet dans lequel on met les infos "Contact" et les infos "Produits du panier" (l'id)
    const order = {
      contact: {
        firstName: form.elements.firstName.value, //inputFirstName.value,
        lastName: form.elements.lastName.value, //inputLastName.value,
        address: form.elements.address.value, //inputAddress.value,
        city: form.elements.city.value, //inputCity.value,
        email: form.elements.email.value, //inputEmail.value,
      },
      products: idProducts,
    };
    console.log("order", order);
    // Méthode d'envoi des données

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };
    console.log("options", options);
    // On envoie les données du contact et l'id des produits à l'API
    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        console.log(form.elements.firstName);
        console.log(form.elements.firstName.value);
        // On redirige vers la page de confirmation de commande en passant l'orderId (numéro de commande) dans l'URL
       document.location.href = `confirmation.html?orderId=${data.orderId}`;
      })
      .catch((err) => {
        console.log("Erreur Fetch product.js", err);
        alert("Un problème a été rencontré lors de l'envoi du formulaire.");
      });
  });
}
