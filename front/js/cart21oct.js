async function getAllProductsInfo(productsList) {
  let result = [];
  for (let product of productsList) {
    await fetch(`http://localhost:3000/api/products/${product}`)
      .then((res) => res.json())
      .then((info) => {
        result.push(info);
        console.log("result", result)
        console.log("info", info)
      });
  }
  return result;
}


async function main() {
  let basket = JSON.parse(localStorage.getItem("basket")) || {};
  console.log("basket", basket)
  let productsList = Object.keys(basket);

  console.log("productsList", productsList) 
  console.log("Object.keys(basket)", Object.keys(basket));
  console.log("Object.values(basket)", Object.values(basket))
  console.log("object(basket)", Object(basket))
  console.log("object.entries(basket)", Object.entries(basket))
  console.log("localStorage", localStorage)
  
  let infos = await getAllProductsInfo(productsList);

  console.log("infos", infos)
  console.log("productsList", productsList)

  await addProductsToPage(infos, basket);
  //errorQuantityMessage(basket, infos) /************** doute ****** */
  // if (isOrderInvalid(infos, basket)) return;
  addTotalToPage(infos, basket);
  addTotalQuantity(infos, basket);
  updatePriceAndQuantity(infos, basket);
  deleteProduct(basket, infos);

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e, basket, infos, productsList))
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
      if (colorIndex !== -1) {
        //si la couleur est présente
        // === colorMyArticle // != -1 : (-1) : couleur non stockée
        basket[idMyArticle][colorIndex].quantity = choiceQty;
        alert("La quantité de votre panier à été modifée");
      }
      localStorage.setItem("basket", JSON.stringify(basket));
      addTotalToPage(infos, basket);
      addTotalQuantity(infos, basket);
     // errorQuantityMessage(basket, infos)
    });
  });
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

      //       if (Object.keys(basket) > 1) {
      // console.log(Object.keys(basket))
      //         alert("Votre article a bien été supprimé.")
      //       }

      deleteArticleFromPage(basket, infos, idThisArticle, colorThisArticle);
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
    alert("Votre panier est vide ! vous allez être redirigé à l'Accueil...");
    window.location.href = "index.html";
  }
}

function deleteArticleFromPage(basket, infos, idThisArticle, colorThisArticle) {
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

// function isOrderInvalid(infos, basket) {
//   for (let elem of Object.keys(basket)) {
// for (let color of basket[elem]) {
//   if (color.quantity >= 100 || color.quantity <= 0) {
//     alert("Please select a color and quantity");
//     return true; // pour rester sur la page = stop
//   }
// }
//   }}
/************************ */
// function errorQuantityMessage(basket, infos) {
//   for (let elem of Object.keys(basket)) {
//     for (let color of basket[elem]) {
//       let inputZones = document.querySelector(".itemQuantity");
//       Array.from(inputZones).forEach((item) => {
//         //     item.addEventListener("change", (ev) => {
//         item.addEventListener("change", (ev) => {
//           ev.preventDefault();
//           console.log(ev, item);

//           let choice = Number(ev.target.value);
//           console.log(choice, item);
//           if (choice < 0 || choice > 100)
//             console.log("Value should be between 0 - 100");
//           return;

//           // inputZones.value = color.quantity
//           // choice = inputZones.value
//           // console.log(inputZones.value, choice)
//           //   console.log(choice)
//           //choice = parseInt(this.value);
//         });
//       });
//     }
//   }
// 
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

/******* Form */
//  const orderBtn = document.querySelector("#order")
//  orderBtn.addEventListener("click", (e) => {
//    submitForm(e),
//    e.preventDefault() // ne pas rafraîchir
// })
/*********** Form */

// const orderButton = document.querySelector("#order")
// orderButton.addEventListener("click", (e) => submitForm(e))

function submitForm(e, basket, infos, productsList ) {
  e.preventDefault()
  if (productsList === 0) 
    alert("Please select items to buy")
   
  

  console.log(basket)
  console.log(Object.keys(basket))
  console.log("productsList.length", productsList.length)
  console.log("productsList", productsList)


  //const myOrder = makeRequestBody(basket, infos, productsList)

/********************************** */
  // let resultForm = [];
  
  //   await fetch(`http://localhost:3000/api/products/order`, {
  //     method: "POST",
  //   body: JSON.stringify(body),
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       resultForm.push(data);
  //       const orderId = data.orderId
  //   //  window.location.href = "/html/confirmation.html" + "?orderId=" + orderId
  //     });
  // }
/****************************** */
   fetch('http://localhost:3000/api/products/order', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'  
                  },
                  body: JSON.stringify(body)
            })
              .then((response) => response.json())
              .then((Data)=>{

                console.log(Data)
                  //document.location.href = "confirmation.html?orderId=" + Data.orderId;
              })
            
              .catch ((e) => alert("Nous avons rencontré un problème, veuillez réesayer ultérieurement"));    

     };



// function isEmailInvalid() {
//   const email = document.querySelector("#email").value
//   const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
//   if (regex.test(email) === false) {
//     alert("Please enter valid email")
//     return true
//   }
//   return false
// }

// function isFormInvalid() {
//   const form = document.querySelector(".cart__order__form")
//   const inputs = form.querySelectorAll("input")
//   inputs.forEach((input) => {
//     if (input.value === "") {
//       alert("Please fill all the fields")
//       return true
//     }
//     return false
//   })
// }

// function makeRequestBody(basket, infos, productsList) {
//   const form = document.querySelector(".cart__order__form")
//   const firstName = form.elements.firstName.value
//   const lastName = form.elements.lastName.value
//   const address = form.elements.address.value
//   const city = form.elements.city.value
//   const email = form.elements.email.value
//   const myOrder = {
//     contact: {
//       firstName: firstName,
//       lastName: lastName,
//       address: address,
//       city: city,
//       email: email
//     },
//     products: getIdsFromCache(basket, infos, productsList)
//   }
//   return myOrder
// }

// function getIdsFromCache(basket, infos, productsList) {
//   const numberOfProducts = Object.keys(basket).length
//   console.log(Object.keys(basket).length)
//   console.log(productsList)
//   const ids = []
//   console.log("numberOfProducts", numberOfProducts)
//   for (let i = 0; i < numberOfProducts; i++) {
//     const key = localStorage.key(i)
//     console.log(localStorage.key)
//     const id = key.split("-")[0]
//     ids.push(id)
//   }
//   return ids
// }