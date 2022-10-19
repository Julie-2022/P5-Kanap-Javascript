/************************ Fabien 18 oct "?" ******************/
const listeDeCourses = {
  codeBarreDesPommes: [{id: 'pinkLadies', qty: 2}, {id: 'nulles', qty: 1}],
  codeBarreDesPoires: [{id: 'pinkLadies', qty: 2}, {id: 'nulles', qty: 1}],
  codeBarreDesPeches: [{id: 'pinkLadies', qty: 2}, {id: 'nulles', qty: 1}],
  codeBarreDesFraises: [{id: 'pinkLadies', qty: 2}, {id: 'nulles', qty: 1}]
}
if (listeDeCourses) {
  if (listeDeCourses.codeBarreDesPoires) {
    listeDeCourses.codeBarreDesPoires[1].id
  }
}
listeDeCourses?.codeBarreDesPoires[1]?.id

/*************************** Bouton suppr  brouillon de côté du 19 oct */
//function deleteProductFromBasket(infos, basket, thisArticle, idThisArticle, colorThisArticle, choiceQty) {

//const keyToDelete = `{"${idThisArticle}":[{"color":"${colorThisArticle}","quantity":"${choiceQty}"}]}`
//const keyToDelete = `${idThisArticle}-${colorThisArticle}`
//  if (idThisArticle.length >= 2) {
// delete keyToDelete
//console.log("keyToDelete", keyToDelete)
//localStorage.removeItem(keyToDelete)

// localStorage.setItem("basket", JSON.stringify(basket));
// } else {
//   //const key = `${idThisArticle}-${colorThisArticle}`
//localStorage.removeItem(`{"${idThisArticle}":[{"color":"${colorThisArticle}","quantity":"${choiceQty}"}]}`)
//keyToDelete.remove()

// basket[idThisArticle].splice(keyToDelete, 1);
// // /**///delete basket[idThisArticle][colorThisArticle];
// console.log("Supression réalisée", basket);

// //localStorage.setItem("basket", JSON.stringify(basket));
// }
// //}

// function deleteArticle(basket, infos) {
//   for (let elem of Object.keys(basket)) {
//     for (let color of basket[elem]) {
//       let deleteItem = document.querySelectorAll(".deleteItem");
//      // deleteItem.forEach((btnDelete) => {
//       //  btnDelete.addEventListener("click", (e) => {
//           e.preventDefault();
//           console.log("e", e);
//           //let colorThisArticle = thisArticle.getAttribute("data-color");
//           //let idThisArticle = thisArticle.getAttribute("data-id");
//           let thisArticle = document.querySelector(`[data-id="${elem}"]` && `[data-color="${color.color}"]`)
//           //let thisArticle = e.target.closest("article");
//           console.log(thisArticle);
//           // On récupère dans le localStorage l'élément (même id et même couleur) que l'on veut supprimer
//          // const IndexToDelete = basket[idThisArticle]?.findIndex(
//          //   (x) => x.color === colorThisArticle
//          // );
//          // console.log(IndexToDelete !== -1); // return true ou false si l'id et la couleur sont stockées ou pas
//           while (thisArticle.firstChild) {
//             thisArticle.removeChild(thisArticle.lastChild)
//           }
//           thisArticle.remove()

//           //(IndexToDelete !== -1) {
//             //si la couleur est présente
//             // === colorThisArticle // != -1 : (-1) : couleur non stockée
//             /**/ //    basket[idThisArticle].splice(IndexToDelete, 1);
//             if (idThisArticle.length >= 2) {
//               const IndexToDelete = basket[idThisArticle]?.findIndex(
//             (x) => x.color === colorThisArticle
//           );
//               basket[idThisArticle].splice(IndexToDelete, 1);
//              // console.log(basket);
//           // } else if (idThisArticle == 1) {
//             } else {
//               //basket.splice(thisArticle, 1);
//               delete basket[idThisArticle];
//               console.log("Supression réalisée");
//           //  } else {
//               console.log("coucou", basket);
//             }
//            })
//         });
//       };
//     }
//   }

/********************** qd 2 couleurs ça marche ! qd 1 couleur renvoit tableau vide ******************** */
// function deleteArticle(basket, infos, removeId, idThisArticle) {
//   let Basket = [];
//   Basket.push(basket);
//   console.log(Basket);
//   for (let elem of Object.keys(basket)) {
//     for (let color of basket[elem]) {
//       let deleteItem = document.querySelectorAll(".deleteItem");
//       deleteItem.forEach((btnDelete) => {
//         btnDelete.addEventListener("click", (e) => {
//           e.preventDefault();
//           console.log("e", e);
//           let thisArticle = e.target.closest("article");
//           let colorThisArticle = thisArticle.getAttribute("data-color");
//           let idThisArticle = thisArticle.getAttribute("data-id");
//           console.log(thisArticle);
//           // On récupère dans le localStorage l'élément (même id et même couleur) que l'on veut supprimer
//           if (idThisArticle.length >= 2) {
//             const IndexToDelete = basket[idThisArticle]?.findIndex(
//               (x) => x.color === colorThisArticle
//             );
//             console.log(IndexToDelete !== -1); // return true ou false si l'id et la couleur sont stockées ou pas
//           //}
//             if (IndexToDelete !== -1) {
//               //si la couleur est présente
//               // === colorThisArticle // != -1 : (-1) : couleur non stockée
//               /**/ //    basket[idThisArticle].splice(IndexToDelete, 1);
//               basket[idThisArticle].splice(IndexToDelete, 1);
//               console.log(basket);

//             } else {

//               //delete basket[idThisArticle];
//               console.log("Supression réalisée");
//               console.log(basket);
//             }
//           }
//         });
//       });
//     }
//   }
// }

/************************************ */
// Suppression d'un produit

// function deleteProduct(infos) {
//   const basketAll = JSON.parse(localStorage.getItem("basket"));
//   if(basketAll){
//     Array.from(basketAll).sort(( a, b ) => a.id.localeCompare(b.id));
//   }
//   console.table(basketAll); // => affiche les pdts du panier

//   let deleteBtns = document.getElementsByClassName("deleteItem");

//   Array.from(deleteBtns).forEach((itemToDelete) => {
//     itemToDelete.addEventListener("click", (e) => {
//       e.preventDefault();
//       console.log(itemToDelete, deleteBtns);
//       //let article = deleteBtns.closest(".cart__item");
//       let thisArticle = e.target.closest("article");
//       console.log(thisArticle);

//       //let basket = JSON.parse(localStorage.getItem("basket"));
//       console.table(basketAll);

//       const thoseDataMatch = Array.from(basketAll).find(// => variable qui récupère l'id de l'élément supprimé
//         (el) => el.id === article.dataset.id
//       );
//       console.log(thoseDataMatch);

//       if (thoseDataMatch) {// => méthode qui renvoie une correspondance-> mise dans la condition -
//         const indexLocalStorageProduct = Array.from(basketAll).findIndex((product) => {
//           return (
//             product.id === article.dataset.id &&
//             article.dataset.color === product.color
//           );
//         });

//         basketAll.splice(indexLocalStorageProduct, 1);// =>méthode(splice) pour supprimer (ou remplacer) un élément (objet) ds le LS
//         // |=> le 1 indique que l'on supprime 1 élément (un élément à chaque clic)

//         localStorage.setItem("produits", JSON.stringify(basket));//réinitialisation du localStorage
//         location.reload();//(optionnel) raffraîchissement de la page
//       }

//     });
//   });
// }

/****************** delete 18 octobre ********************/
/************************************************* */
// function deleteArticle(basket, infos, removeId) {
//   // let Basket = [];
//   // Basket.push(basket);
//   // console.log(Basket);
//   for (let elem of Object.keys(basket)) {
//     for (let color of basket[elem]) {
//       let deleteItem = document.querySelectorAll(".deleteItem");
//       deleteItem.forEach((btnDelete) => {
//         btnDelete.addEventListener("click", (e) => {
//           e.preventDefault();
//           console.log("e", e);
//           let thisArticle = e.target.closest("article");
//           let colorThisArticle = thisArticle.getAttribute("data-color");
//           let idThisArticle = thisArticle.getAttribute("data-id");
//           console.log(thisArticle);
//           // On récupère dans le localStorage l'élément (même id et même couleur) que l'on veut supprimer
//           const IndexToDelete = basket[idThisArticle]?.findIndex(
//             (x) => x.color === colorThisArticle
//           );
//           console.log(IndexToDelete !== -1); // return true ou false si l'id et la couleur sont stockées ou pas
//           if (IndexToDelete !== -1) {
//             //si la couleur est présente
//             // === colorThisArticle // != -1 : (-1) : couleur non stockée
//             /**/ //    basket[idThisArticle].splice(IndexToDelete, 1);
//             if (idThisArticle.length >= 2) {
//               basket[idThisArticle].splice(IndexToDelete, 1);
//              // console.log(basket);
//           // } else if (idThisArticle == 1) {
//             } else {
//               //basket.splice(thisArticle, 1);
//               delete basket[idThisArticle];
//               console.log("Supression réalisée");
//           //  } else {
//               console.log("coucou", basket);
//             }
//            }
//         });
//       });
//     }
//   }
// }


/*************ce que j'ai fais pour deleteProduct :  ******************/
 /********************** Suppr *************************** */
      // function deleteProduct(basket,idToremove) {
      //   //on recupere le btn delete
      //   let deleteBtn = document.querySelectorAll(".deleteItem");
      //   // //on loop a travers tt les btn delete
      //   for (let i = 0; i < deleteBtn.length; i++) {
      //     //   //event listener click
      //     deleteBtn[i].addEventListener("click", (event) => {
      //       event.preventDefault();
      //       //     //on recupere l'id et la couleur
      //       let deleteId = key;
      //       let deleteColor = color;
      //   console.log(deleteId);
      //   console.log(deleteColor);
      //       const targetIndex = basket[key];
      //   console.log(targetIndex !== -1); // return true ou false si la couleur est stockée ou pas
      //       let articleToDelete = document.querySelector(
      //         `article[data-id="${deleteId}"][data-color="${deleteColor}"]`
      //       );
      //       articleToDelete = event.target.closest("article");
      //   console.log("avant remove article", basket);
      //       articleToDelete.remove("article");
      //   console.log("après remove article", basket);
      //   console.log(articleToDelete, basket, "element à suppr");
      //   console.log("key", key, deleteId);
            /************** */
            /*-----ce code fonctionne si on suppr le produit d'en haut pour produit mm id mm couleur ----*/
            // const deleteItem = Object.values(basket).find(
            //   (product) =>
            //     product.id == deleteId && product.color == deleteColor
            // );
            // basket[key].splice(deleteItem, 1);
            // console.log(basket);
            // console.log("deleteItem", deleteItem)// undefined

            /************************** */
            /*---- ce code suppr tjrs le 2ème kanap de mm id ----*/
            // if (targetIndex.length >= 2) {
            //   let productIndex = targetIndex.findIndex(
            //     (x) => x.color === deleteColor
            //   );
            //   targetIndex.splice(productIndex, 1);
            // } else {
            //   delete targetIndex;
            // }
            // console.log("targetIndex", targetIndex)
/***************************************** */
// console.log(basket);
//  if (targetIndex.length >= 2) {
//   let productIndex = basket[key].findIndex(
//     (x) => x.color === deleteColor
//     );
//     console.log("productIndex", productIndex);
//     basket[key].splice(productIndex, 1);
//     // basket[key].removeItem(productIndex)
//     //delete productIndex
//     console.log("basket + supression", basket);
// }
/*************** */
// else
//   if (targetIndex) {
// //  delete basket[key];
// const deleteItem = basket[id].findIndex(
//               (y) =>
//                 y.id === deleteId && y.color === deleteColor //|| product.deleteId <= 1
//             );
//             //basket[key].removeItem(deleteItem)
//             //delete deleteItem //basket[key].color//
//             /**/ basket[key].splice(deleteItem, 1);
//             console.log(basket);
// }
// else {
//  delete basket[key].splice(targetIndex, 1)
//   //[{color: deleteColor, quantity: quantity}];
//  }


/***************************************** */
            //On met à jour le LS du navigateur
      //       localStorage.setItem("basket", JSON.stringify(basket));
      //       console.log(localStorage);
      //       totalQuantity();
      //       totalProductsPrice();
      //     });
      //   }
      // }
      // deleteProduct();
      
      /*****************Total Price 1er essai ************** */
      //    let totalPrice = document.querySelector("#totalPrice");
      // totalP = 0;
      // for (let id in basket) {
      //   for (let color in basket[id]) {
      //     totalP += parseInt((basket[id][color].quantity) * results.price);
      //   }
      // }
      // totalPrice.innerText = totalP;
      /************** TotalPrice ************** */
      /************** TotalPrice ********************** */
      
      // totalProductsPrice();
      /********************************************* */
  
// displayCart();

/******************************************** */

/***************************************************** */
//   function deleteProduct(id, color) {
//     //on recupere le btn delete
//     let deleteBtn = document.querySelectorAll(".deleteItem");
//     //on loop a travers tt les btn delete
//     for (let i = 0; i < deleteBtn.length; i++) {
//       //event listener click
//       deleteBtn[i].addEventListener("click", (event) => {
//         event.preventDefault();
//         //on recupere l'id et la couleur
//         let deleteId = key;
//         let deleteColor = color;
//         console.log("deleteId", deleteId);
//         console.log("deleteColor", color);
//         const targetIndex = basket[key]
//         //  console.log("targetIndex", targetIndex);
//         //  console.log(targetIndex !== -1); // return true ou false si la couleur est stockée ou pas
//         let articleToDelete = document.querySelector(
//           `article[data-id="${deleteId}"][data-color="${deleteColor}"]`
//         );
//         articleToDelete = event.target.closest("article");
//         // console.log("avant remove article", basket);
//         articleToDelete.remove("article");
//         // console.log("après remove article", basket);
//         // console.log(articleToDelete, basket, "element à suppr");
//         // console.log("key", key, deleteId);
//         /****** Suppr tjrs le premier kanap de mm id ******** */

//         const deleteItem = Object.values(basket).find(
//           (product) =>
//             product.id === deleteId && product.color === color //|| product.deleteId <= 1
//         );
//         console.log(deleteId, "&&", deleteColor)
//         console.log("deleteItem", deleteItem);
//         //  delete basket[key].color//deleteItem
//         /**/ basket[key].splice(deleteItem, 1);
//         console.log(basket);
/********** garde le 1er kanap suppr de mm id ************** */
// if (targetIndex.length >= 2) {
//   let productIndex = targetIndex.findIndex(
//     (x) => x.color === deleteColor
//   );
//   targetIndex.splice(productIndex, 1);
// } else {
//   delete targetIndex;
// }
/******************************* */
// console.log(basket);
//  if (targetIndex.length >= 2) {
//   let productIndex = basket[key].findIndex(
//     (x) => x.color === deleteColor
//     );
//     console.log("productIndex", productIndex);
//     basket[key].splice(productIndex, 1);
//     // basket[key].removeItem(productIndex)
//     //delete productIndex
//     console.log("basket + supression", basket);
// }
// /*************** */
// else
//   if (targetIndex) {
// //  delete basket[key];
// const deleteItem = basket[id].findIndex(
//               (y) =>
//                 y.id === deleteId && y.color === deleteColor //|| product.deleteId <= 1
//             );
//             //basket[key].removeItem(deleteItem)
//             //delete deleteItem //basket[key].color//
//             /**/ basket[key].splice(deleteItem, 1);
//             console.log(basket);
// }
// else {
//  delete basket[id]
//   //[{color: deleteColor, quantity: quantity}];
//  }

/********************** */
//       else {
//    alert("Votre panier est vide");
//  }
//         /************************ */
//         //On met à jour le LS du navigateur
//         /*** */ //localStorage.setItem("basket", JSON.stringify(basket));
//         console.log(localStorage);

//         totalQuantity();
//         totalProductsPrice();
//       });
//     }
//   }
//   deleteProduct();


/*********************************************************************************** */
// Création d'une var. qui appel la methode pour creer les éléments de la propriété de l'id correspondant à "cart__items"
let elementQuantity = document.getElementById("cart__items");
// Variable pour stocker l'ensemble des infos du panier
let panierComplet = [];
// Cette fonction fait GetLocalStorage et retourne les données
function getCart() {
  // Initialisation du local storage
  let LocalStorage = JSON.parse(localStorage.getItem("product")) || [];
  console.table(LocalStorage);
  if (
    LocalStorage === null ||
    LocalStorage === 0 ||
    LocalStorage === [] ||
    LocalStorage.length === 0
  ) {
    let element = document.createElement("div");
    element.innerHTML = "Votre panier est vide";
    elementQuantity.appendChild(element);
    console.log("Panier vide");
    return LocalStorage;
  } else LocalStorage !== null || LocalStorage !== 0;
  {
    console.log("Des produits sont dans le panier");
    return LocalStorage;
  }
}
let productLocalStorage = getCart();
// Récupération des infos à afficher via l'api
fetch(`http://localhost:3000/api/products/`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (produitsAPI) {
    console.log("produits du LS", productLocalStorage);
    // Tableau vide qui contiendra les données du LS (qty, color) et les données de l'api (id, name, price, color, imageUrl)
    // Pour chaque produit existant dans l'API
    produitsAPI.map((productAPI) => {
      // Et pour chaque produit existant dans le LS
      productLocalStorage.map((itemLS) => {
        // on regarde si l'ID correspond entre les deux
        if (productAPI._id === itemLS.id) {
          // Si oui, le produit est trouvé et ajouté dans le panierComplet (ou on pourra trouver toutes les infos nécéssaire à l'utilisateur)
          panierComplet.push({
            id: productAPI._id,
            name: productAPI.name,
            price: productAPI.price,
            color: itemLS.color,
            quantity: itemLS.quantity,
            imageUrl: productAPI.imageUrl,
          });
        }
      });
    });
    // le panierComplet est rempli
    console.log("panierComplet", panierComplet);
    // Créer les bloc HTML
    createProducts(panierComplet);
    // Ajoute les events de delete et de changement de quantité
    calculQuantite();
    calculTotalPrice();
    eventDeleteProduct();
    eventupdateQuantity();
  });
// Fonction de creation des éléments
function createProducts(productList) {
  // Si le panier est vide
  for (let product of productList) {
    //creation de l'article
    elementQuantity.innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                    <div class="cart__item__img">
                        <img src="${product.imageUrl}" alt="Photographie d'un canapé ${product.name}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__titlePrice">
                            <h2>${product.name}</h2>
                            <p>${product.price} €</p>
                            <p>${product.color}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem" id="[item_Id]">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`;
  }
}
//Evènements de suppression sur les boutons supprimer avec closest
function eventDeleteProduct() {
  let selectsSupp = document.querySelectorAll(".deleteItem");
  //console.log("selectsSupp", selectsSupp);
  selectsSupp.forEach((select) => {
    select.addEventListener("click", (event) => {
      deleteProduct(event);
    });
  });
}
// Fonction de suppression 
function deleteProduct(event) {
  event.preventDefault();
  //console.log(event.target);
  //on pointe le parent hiéarchique <article>`du lien à supp
  let myProduct = event.target.closest(`article`);
  let id = myProduct.getAttribute("data-id");
  let color = myProduct.getAttribute("data-color");
  //console.log("LS", productLocalStorage)
  const resultIndex = productLocalStorage.findIndex(
    (e) => e.id === id && e.color === color
  );
  //ligne de l'index
  //console.log("resultIndex", resultIndex);
  // On supprime
  productLocalStorage.splice(resultIndex, 1);
  // On vérifie que le LS est correct après supression
  // console.log("productLocalStorage + supression", productLocalStorage);
  // On met à jour le LS du navigateur
  localStorage.setItem("product", JSON.stringify(productLocalStorage));
  // On demande à enlever l'article du DOM
  myProduct.parentNode.removeChild(myProduct);
  // On supprime le produit du panierComplet
  panierComplet.splice(resultIndex, 1);
  // On recalcule
  calculQuantite();
  calculTotalPrice();
}
//Evènements sur les inputs quantité
function eventupdateQuantity() {
  let changeQty = document.querySelectorAll(".itemQuantity");
  //console.log("changeQty", changeQty);
  changeQty.forEach((item) => {
    item.addEventListener("change", (event) => {
      updateQuantity(event);
    });
  });
}
// Fonction sur les quantités
function updateQuantity(event) {
  event.preventDefault();
  choiceQty = Number(event.target.value);
    // On pointe le parent hiérarchique <article> de l'input "itemQuantity"
  let myArticle = event.target.closest(`article`);
  let colorMyArticle = myArticle.getAttribute("data-color");
  let idMyArticle = myArticle.getAttribute("data-id");
  // On récupère dans le localStorage l'élément (même id et même couleur) dont on veut modifier la quantité
  const resultIndex = productLocalStorage.findIndex(
    (item) => item.id === idMyArticle && item.color === colorMyArticle
  ); 
  // Si la quantité est comprise entre 1 et 100 et que c'est un nombre entier on met à jour la quantité dans le localStorage et le DOM
  if (choiceQty > 0 && choiceQty <= 100) {
    let LS = JSON.parse(localStorage.getItem("product")); 
    //console.log(LS[resultIndex])
    LS[resultIndex].quantity = choiceQty;
    localStorage.setItem("product", JSON.stringify(LS));
    // Maj du produit du panierComplet
    panierComplet[resultIndex].quantity = choiceQty;
    //console.log(panierComplet);
    // Et, on recalcule la quantité et le prix total du panier
    // On recalcule
    calculQuantite();
    calculTotalPrice();
  }
}

function calculQuantite() {
  
  //console.log("mon panier complet",panierComplet)
  
  let qty = 0;

  for (let product of panierComplet) {    
    qty += product.quantity;
  }
  
  document.getElementById("totalQuantity").innerHTML = qty;
}

function calculTotalPrice() {
   
  let price = 0;

  for (let product of panierComplet) {
    price += product.price * product.quantity;
  }

  document.getElementById("totalPrice").innerHTML = price;
}

/************** Méthode Benjamin ****************/
async function changeQuantity(_id, color, oldQty, newQty) {
  if (oldQty == newQty) {
    return;
  } else {
    let colorIndex = basket[id].findIndex((item) => item.color === color);
    basket[_id][colorIndex].quantity = newQty;
  }
  
  console.log("coucou")
  alert("La quantité de votre panier à été modifée");
  //addTotalQuantity(infos, basket);
  //addTotalToPage(infos, basket);
  (await addTotalQuantity()) && (await addTotalToPage());
  localStorage.setItem("basket", JSON.stringify(basket));
}
// et dans addProductToPage

changeQuantity(elemInfos.id, color.color, parseInt(color.quantity), parseInt(input.value))