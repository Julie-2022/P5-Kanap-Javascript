///console.log("Arrivée sur la page panier");
//Récupération des données qui ne concernent que les produits présents dans le LocalStorage.
async function getAllProductsInfo(productsIdList) {
  let result = [];
  for (let product of productsIdList) {
    await fetch(`http://localhost:3000/api/products/${product}`)
      .then(res => res.json())
      .then(info => {
        result.push(info);
        ///console.log("info :", info);
      });
  }
  return result;
}

/*************** Fonction principale d'affichage de la page panier ***************/
async function main() {
  // Récupération de l'id des produits dans le localStorage
  let basket = JSON.parse(localStorage.getItem("basket")) || {};
  ///console.table("basket", basket);
  let productsIdList = Object.keys(basket);

  /*============= Les possibilités d'accès aux données ==========*/
  ///console.log("productsIdList", productsIdList);
  ///console.log("Object.keys(basket)", Object.keys(basket));
  ///console.log("Object.values(basket)", Object.values(basket));
  ///console.log("object(basket)", Object(basket));
  ///console.log("object.entries(basket)", Object.entries(basket));
  ///console.log("localStorage", localStorage);
  /*============================================================*/
  // Récupération des données de l'API correspondant aux id présents dans le localStorage.
  let infos = await getAllProductsInfo(productsIdList);

  /*=========== données de l'API dans un tableau ===============*/
  ///console.table("infos de l'API", infos);
  /*============================================================*/

  await displayProductsToPage(infos, basket);
  addTotalToPage(infos, basket);
  addTotalQuantity(infos, basket);
  updateQuantity(infos, basket);
  deleteProduct(basket, infos);
  submitForm(basket, productsIdList);
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
  totalQuantity.textContent = totalQty;
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
  totalQuantity.textContent = total;
}

/************* updateQuantity *************** */
function updateQuantity(infos, basket) {
  //for (let elem of Object.keys(basket)) {
  let changeInputs = document.getElementsByClassName("itemQuantity");
  //console.log(changeInputs);
  Array.from(changeInputs).forEach(item => {
    item.addEventListener("change", event => {
      event.preventDefault();
      ///console.log(item, event);
      choiceQty = Number(event.target.value);
      ///console.log("choiceQty :", event.target.value);
      // On pointe le parent hiérarchique <article> de l'input "itemQuantity"
      let myArticle = event.target.closest("article");
      let colorMyArticle = myArticle.getAttribute("data-color");
      let idMyArticle = myArticle.getAttribute("data-id");
      // On récupère dans le localStorage l'élément (même id et même couleur) dont on veut modifier la quantité
      const colorIndex = basket[idMyArticle]?.findIndex(
        item => item.color === colorMyArticle
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
  if (choiceQty == null || choiceQty <= 0 || choiceQty >= 100) {
    alert("La quantité d'un article choisi doit être comprise entre 1 et 100 et être un nombre entier.");
    return true; // pour rester sur la page = stop
  }
}

/************** deleteProduct ************** */
function deleteProduct(basket, infos) {
  let deleteItem = document.querySelectorAll(".deleteItem");
  deleteItem.forEach(btnDelete => {
    btnDelete.addEventListener("click", e => {
      e.preventDefault();
      ///console.log("e", e);
      // sélectionner ou cibler l'élément parent le plus proche de "e"
      let thisArticle = e.target.closest("article");
      const colorThisArticle = thisArticle.getAttribute("data-color");
      const idThisArticle = thisArticle.getAttribute("data-id");
      ///console.log(thisArticle);
      ///console.log(idThisArticle, colorThisArticle);
      // création d'indexToDelete pour trouver l'article à supprimer dans le localStorage en fonction de sa couleur
      const IndexToDelete = basket[idThisArticle]?.findIndex(
        x => x.color === colorThisArticle
      );
      ///console.log("IndexToDelete !== -1 :", IndexToDelete !== -1); // return true ou false si la couleur est stockée ou pas
      // On le supprime
      basket[idThisArticle].splice(IndexToDelete, 1);
      ///console.log("basket", basket);
      // On met à jour le localStorage
      localStorage.setItem("basket", JSON.stringify(basket));
      deleteArticleFromPage(idThisArticle, colorThisArticle);
      deleteProductEmptyFromBasket(basket, idThisArticle);
      addTotalToPage(infos, basket);
      addTotalQuantity(infos, basket);
      basketEmptyMessage(basket, infos);
    });
  });
}

function deleteArticleFromPage(idThisArticle, colorThisArticle) {
  const articleToDelete = document.querySelector(
    `article[data-id="${idThisArticle}"][data-color="${colorThisArticle}"]`
  );
  articleToDelete.remove();
}

function deleteProductEmptyFromBasket(basket, idThisArticle) {
  // Supprimer un article complètement du localStorage
  if (basket[idThisArticle] <= 1) {
    // renvoie true si il n'y a plus qu'un seul article de cet id dans le panier
    ///console.log("dernier article de cet id du panier", basket[idThisArticle] <= 1);
    delete basket[idThisArticle];
    ///console.log("basket2", basket); // objet vide
    localStorage.setItem("basket", JSON.stringify(basket));
  }
}

function basketEmptyMessage(basket) {
  if (Object.keys(basket) === null || Object.keys(basket).length === 0) {
    ///console.log("panier vide !");
    localStorage.clear();
    alert("Votre panier est vide ! Vous allez être redirigé sur la page d'Accueil...");
    window.location.href = "index.html";
  }
}

/********* displayProductsToPage ************ */
async function displayProductsToPage(infos, basket) {
  for (let elem of Object.keys(basket)) {
    let elemInfos = await infos.find(el => el._id === elem);
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
      kanapName.textContent = elemInfos.name;
      div3.appendChild(kanapName);

      let kanapColor = document.createElement("p");
      kanapColor.textContent = color.color;
      div3.appendChild(kanapColor);

      let KanapPrice = document.createElement("p");
      KanapPrice.textContent = elemInfos.price + " €";
      div3.appendChild(KanapPrice);

      let div4 = document.createElement("div");
      div4.classList.add("cart__item__content__settings");
      div2.appendChild(div4);

      let DivQuantity = document.createElement("div");
      DivQuantity.classList.add("cart__item__content__settings__quantity");
      div4.appendChild(DivQuantity);

      let p = document.createElement("p");
      p.textContent = "Qté : ";
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

/*******************========> Formulaire <=======******************* */
/** Données du back-end pour le Formulaire
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

const boutonCommander = document.getElementById("order");
const form = document.querySelector(".cart__order__form");

function submitForm(basket, productsIdList) {
  // firstName
  firstName.addEventListener("input", e => {
    e.preventDefault();
    let firstName = document.getElementById("firstName");
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    let noNumber = new RegExp(
      "^[^.?!:;,/\\/_-]([. '-]?[a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$"
    );
    if (noNumber.test(firstName.value) == false) {
      firstNameErrorMsg.textContent = "Veuillez renseigner un prénom valide !";
      boutonCommander.disabled = true;
    } else {
      firstNameErrorMsg.textContent = "";
      boutonCommander.disabled = false;
    }
  });
  // lastName
  lastName.addEventListener("input", e => {
    e.preventDefault();
    let lastName = document.getElementById("lastName");
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    let noNumber = new RegExp(
      "^[^.?!:;,/\\/_-]([. '-]?[a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$"
    );
    if (noNumber.test(lastName.value) == false) {
      lastNameErrorMsg.textContent = "Veuillez renseigner un nom valide !";
      boutonCommander.disabled = true;
    } else {
      lastNameErrorMsg.textContent = "";
      boutonCommander.disabled = false;
    }
  });
  // address
  address.addEventListener("input", e => {
    e.preventDefault();
    let address = document.getElementById("address");
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    let addressReg = new RegExp(
      "^[0-9a-zA-Z -àâäãçéèêëìîïòôöõùûüñ,.'-]{5,60}$"
    );
    if (addressReg.test(address.value) == false) {
      addressErrorMsg.textContent = "Veuillez renseigner une adresse valide !";
      boutonCommander.disabled = true;
    } else {
      addressErrorMsg.textContent = "";
      boutonCommander.disabled = false;
    }
  });
  // city
  city.addEventListener("input", e => {
    e.preventDefault();
    let city = document.getElementById("city");
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    let noNumber = new RegExp(
      "^[^.?!:;,/\\/_-]([. '-]?[a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$"
    );
    if (noNumber.test(city.value) == false) {
      cityErrorMsg.textContent = "Veuillez renseigner un nom de ville valide !";
      boutonCommander.disabled = true;
    } else {
      cityErrorMsg.textContent = "";
      boutonCommander.disabled = false;
    }
  });
  //email
  email.addEventListener("input", e => {
    e.preventDefault();
    let email = document.getElementById("email");
    let emailErrorMsg = document.getElementById("emailErrorMsg");
    let emailReg = (regexEmail =
      /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/);
    if (emailReg.test(email.value) == false) {
      emailErrorMsg.textContent = "Veuillez renseigner un e-mail valide !";
      boutonCommander.disabled = true;
    } else {
      emailErrorMsg.textContent = "";
      boutonCommander.disabled = false;
    }
  });

  /************************************** */
  //Ecoute du bouton Commander
  boutonCommander.addEventListener("click", event => {
    event.preventDefault(); // Empêche le rechargement de la page
    // On crée un objet dans lequel on met les infos "Contact" et les infos "Produits du panier" (l'id)
    let order = {
      contact: {
        firstName: firstName.value, //: form.elements.firstName.value,
        lastName: lastName.value, //: form.elements.lastName.value,
        address: address.value, //: form.elements.address.value,
        city: city.value, //: form.elements.city.value,
        email: email.value, //: form.elements.email.value,
      },
      products: productsIdList, // = idProducts, = Object.keys(basket),
    };
    ///console.log("order :", order);

    if (productsIdList.length === 0) {
      alert("Veuillez ajouter des articles à votre panier avant de remplir le formulaire. Vous allez être redirigé sur la page d'Accueil...");
      window.location.href = "index.html";
    } else if (
      firstName.value === "" ||
      lastName.value === "" ||
      address.value === "" ||
      city.value === "" ||
      email.value === ""
    ) {
      alert("Veuillez remplir le formulaire avant de valider votre commande.");
    } else {
      // vérifications :
      ///console.log(Object.keys(basket), "=", productsIdList);
      ///console.log(form.elements, form);
      ///console.log(form.elements.firstName);
      ///console.log(form.elements.firstName.value);

      // Méthode d'envoi des données
      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      };
      ///console.log("options à envoyer :", options);
      // On envoie les données du contact et l'id des produits à l'API
      fetch("http://localhost:3000/api/products/order", options)
        .then(response => response.json())
        .then(data => {
          ///console.log("data", data);
          // On redirige vers la page de confirmation de commande en passant l'orderId (numéro de commande) dans l'URL
          document.location.href = `confirmation.html?orderId=${data.orderId}`;
        })
        .catch(err => {
          ///console.log("Erreur Fetch cart.js", err);
          alert("Un problème a été rencontré lors de l'envoi du formulaire. La commande n'est donc pas validée. Si le problème persiste, n'hésitez pas à nous contacter.");
        });
    }
  });
}
