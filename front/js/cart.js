console.log("Arrivée sur la page panier")
async function getAllProductsInfo(productsIdList) {
  let result = [];
  for (let product of productsIdList) {
    await fetch(`http://localhost:3000/api/products/${product}`)
      .then((res) => res.json())
      .then((info) => {
        result.push(info);
        console.log("info", info);
      });
  }
  return result;
}

async function main() {
  //Réupération de l'id des produits dans le localStorage
  let basket = JSON.parse(localStorage.getItem("basket")) || {};
  console.table("basket", basket);
  let productsIdList = Object.keys(basket);

  /*********** Les possibilités d'accès aux données */
  console.log("productsIdList", productsIdList);
  console.log("Object.keys(basket)", Object.keys(basket));
  // console.log("Object.values(basket)", Object.values(basket));
  // console.log("object(basket)", Object(basket));
  // console.log("object.entries(basket)", Object.entries(basket));
  // console.log("localStorage", localStorage);
  /********************************************** */

  let infos = await getAllProductsInfo(productsIdList);

  /********************** données ********************* */
  console.table("infos de l'API", infos);
  /********************************************** */

  await displayProductsToPage(infos, basket);
  addTotalToPage(infos, basket);
  addTotalQuantity(infos, basket);
  updateQuantity(infos, basket);
  deleteProduct(basket, infos);
  submitForm(basket, infos, productsIdList);
}
main();

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

function updateQuantity(infos, basket) {
  //for (let elem of Object.keys(basket)) {
  let changeInputs = document.getElementsByClassName("itemQuantity");
  //console.log(changeInputs);
  Array.from(changeInputs).forEach((item) => {
    item.addEventListener("change", (event) => {
      event.preventDefault();
      //console.log(item, event);
      choiceQty = Number(event.target.value);
      console.log(event.target.value)

      // On pointe le parent hiérarchique <article> de l'input "itemQuantity"
      let myArticle = event.target.closest("article");
      let colorMyArticle = myArticle.getAttribute("data-color");
      let idMyArticle = myArticle.getAttribute("data-id");

      // On récupère dans le localStorage l'élément (même id et même couleur) dont on veut modifier la quantité
      const colorIndex = basket[idMyArticle]?.findIndex(
        (item) => item.color === colorMyArticle
      );
      // validation de la quantité
      if (isQtyInvalid(choiceQty, colorMyArticle, item)) return;

      if (colorIndex !== -1) {
        //si la couleur est présente
        // === colorMyArticle // != -1 : (-1) : couleur non stockée
        basket[idMyArticle][colorIndex].quantity = choiceQty;
        alert("La quantité de votre panier à été modifée");
      }
      localStorage.setItem("basket", JSON.stringify(basket));

      addTotalToPage(infos, basket);
      addTotalQuantity(infos, basket);
    });
  });
}

function isQtyInvalid(choiceQty) {
  //(choiceQty) != Number.isInteger(choiceQty)
  if (choiceQty == null || choiceQty <= 0 || choiceQty >= 100) {
    alert(
      "La quantité d'un article choisi doit être comprise entre 1 et 100 et être un nombre entier."
    );
    return true; // pour rester sur la page = stop
  }
}

function deleteProduct(basket, infos) {
  let deleteItem = document.querySelectorAll(".deleteItem");
  deleteItem.forEach((btnDelete) => {
    btnDelete.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("e", e);
      // sélectioner ou cibler l'élément parent le plus proche de "e"
      let thisArticle = e.target.closest("article");
      const colorThisArticle = thisArticle.getAttribute("data-color");
      const idThisArticle = thisArticle.getAttribute("data-id");
      console.log(thisArticle);
      console.log(idThisArticle, colorThisArticle);

      const IndexToDelete = basket[idThisArticle]?.findIndex(
        (x) => x.color === colorThisArticle
      );

      basket[idThisArticle].splice(IndexToDelete, 1);
      console.log(IndexToDelete !== -1); // return true ou false si la couleur est stockée ou pas
      console.log("basket1", basket);

      localStorage.setItem("basket", JSON.stringify(basket));

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
  // Supprimer un article complètement du localStorage
  if (basket[idThisArticle] <= 1) { // renvoie true si il n'y a plus qu'un seul article de cet id dans le panier
    console.log("dernier article du panier", basket[idThisArticle] <= 1);
    delete basket[idThisArticle];
    console.log("basket2", basket); // objet vide
    localStorage.setItem("basket", JSON.stringify(basket));
  }
}

function basketEmptyMessage(basket) {
  if (Object.keys(basket) === null || Object.keys(basket).length === 0) {
    console.log("vide");
    localStorage.clear();
    alert(
      "Votre panier est vide ! Vous allez être redirigé sur la page d'Accueil..."
    );
    window.location.href = "index.html";
  }
}

function deleteArticleFromPage(idThisArticle, colorThisArticle) {
  const articleToDelete = document.querySelector(
    `article[data-id="${idThisArticle}"][data-color="${colorThisArticle}"]`
  );
  articleToDelete.remove();
}

async function displayProductsToPage(infos, basket) {
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
      input.value = color.quantity;
      DivQuantity.appendChild(input);

      let div6 = document.createElement("div");
      div6.classList.add("cart__item__content__settings__delete");
      div4.appendChild(div6);

      let deleteP = document.createElement("p");
      deleteP.classList.add("deleteItem");
      deleteP.textContent = "Supprimer";
      div6.appendChild(deleteP);
    }
  }
}

/******************** Formulaire *****************************/
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

const boutonCommander = document.getElementById("order");

function submitForm(basket, infos, productsIdList) {
  //Ecoute du bouton Commander
  boutonCommander.addEventListener("click", (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    if (productsIdList.length === 0)
      alert(
        "Veuillez ajouter des articles à votre panier avant de remplir le formulaire."
      );

    const form = document.querySelector(".cart__order__form");

    console.log(form.elements, form);
    console.log(Object.keys(basket), "=", productsIdList);

    //Récupération des id des produits du panier, dans le localStorage
    let idProducts = [];
    for (let i = 0; i < productsIdList.length; i++) {
      idProducts.push(productsIdList[i]);
      console.log("idProducts", idProducts);
    }

    // Validation des champs du formulaire
    if (formInvalid()) return;
    if (firstNameInvalid()) return;
    if (lastNameInvalid()) return;
    if (addressInvalid()) return;
    if (cityInvalid()) return;
    if (emailInvalid()) return;

    // On créé un objet dans lequel on met les infos "Contact" et les infos "Produits du panier" (l'id)
    const order = {
      contact: {
        firstName: form.elements.firstName.value, 
        lastName: form.elements.lastName.value,
        address: form.elements.address.value,
        city: form.elements.city.value,
        email: form.elements.email.value,
      },
      products: idProducts,
    };
    console.log("order :", order);

    // Méthode d'envoi des données
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };
    console.log("options à envoyer :", options);
    // On envoie les données du contact et l'id des produits à l'API
    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        console.log(form.elements.firstName);
        console.log(form.elements.firstName.value);
        // On redirige vers la page de confirmation de commande en passant l'orderId (numéro de commande) dans l'URL
        ///document.location.href = `confirmation.html?orderId=${data.orderId}`;
      })
      .catch((err) => {
        console.log("Erreur Fetch product.js", err);
        alert("Un problème a été rencontré lors de l'envoi du formulaire.");
      });
  });
}

function formInvalid() {
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

function firstNameInvalid() {
  const firstName = document.querySelector("#firstName").value;
  const regexFName =
    /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{2,}$/;
  if (regexFName.test(firstName) === false) {
    firstNameErrorMsg.textContent = "Veuillez renseigner un prénom valide !";
    return true;
  }
  return false;
}

function lastNameInvalid() {
  const lastName = document.querySelector("#lastName").value;
  const regexLName =
    /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{2,}$/;
  if (regexLName.test(lastName) === false) {
    lastNameErrorMsg.textContent = "Veuillez renseigner un nom valide !";
    return true;
  }
  return false;
}

function addressInvalid() {
  const address = document.querySelector("#address").value;
  //const regexAdd = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ,.'-]+)+/
   const regexAdd = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/; 
  if (regexAdd.test(address) === false) {
    addressErrorMsg.textContent = "Veuillez saisir une adresse valide !";
    return true;
  }
  return false;
}

function cityInvalid() {
  const city = document.querySelector("#city").value;
  //let regex = // /^[[:alpha:]]([-' ]?[[:alpha:]])*$/
  const regexCity =
    /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{2,}$/;
  if (regexCity.test(city) === false) {
    cityErrorMsg.textContent = "Veuillez saisir un nom de ville valide !";
    return true;
  }
  return false;
}

function emailInvalid() {
  const email = document.querySelector("#email").value;
  const regexEmail =
    /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
  if (regexEmail.test(email) === false) {
    emailErrorMsg.textContent = "Veuillez saisir une adresse email valide !";
    /************** test couleur  **********/
    //   (form.elements.email).style.border = "2px solid red";
    //  // form.elements.email.css('border-color', "2px solid #cc3333");
    //   //form.elements.email.css('border-color', 'none !important');
    //   //form.elements.email.value.style.border = "2px solid red";
    //   setTimeout(function(form, order, email) {
    //     //(form.elements.email).css('border-color', 'none !important')
    //     (form.elements.email).style.border = "none !important"
    //   }, 3000)
    /********************** */
    return true;
  }
  return false;
}
