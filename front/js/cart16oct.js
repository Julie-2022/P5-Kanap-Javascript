async function getAllProductsInfo(productsList) {
  let result = [];
  for (let product of productsList) {
    await fetch(`http://localhost:3000/api/products/${product}`)
      .then((res) => res.json())
      .then((info) => {
        result.push(info);
      });
  }
  return result;
}

async function main() {
  let basket = JSON.parse(localStorage.getItem("basket")) || {};
  let productsList = Object.keys(basket);
  let infos = await getAllProductsInfo(productsList);
  await addProductsToPage(infos, basket);
  addTotalToPage(infos, basket);
  addTotalQuantity(infos, basket);
  
  //deleteProduct(basket, IdToRemove)
}
main();

async function addTotalQuantity(infos, basket) {
  totalQty = 0;
  for (let elem of Object.keys(basket)) {
    let elemInfos = await infos.find((el) => el._id === elem);
    for (let color of basket[elem]) {
      totalQty += parseInt(color.quantity);
    }
  }
  let totalQuantity = document.querySelector("#totalQuantity");
  totalQuantity.innerText = totalQty;
}

/********************* */

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



// async function changeQuantity(infos, basket) {
//   for (let elem of Object.keys(basket)) {
//     let elemInfos = await infos.find((el) => el._id === elem);
//     for (let color of basket[elem]) {
//       let inputChange = document.querySelectorAll(".itemQuantity");
//       inputChange.forEach((Element) => {
//         Element.addEventListener("change", (event) => {
//           event.preventDefault();

//           console.log(event, Element);

//           let currentQuantity = color.quantity;
//           console.log(currentQuantity);
//           const newValue = Number(inputChange.value);
//           //const updateQuantity = parseInt((currentQuantity = newValue));
//           const updateQuantity = Number(newValue)
//           console.log(updateQuantity);
//           color.quantity = updateQuantity;
//           console.table(basket);
//       //    localStorage.setItem("basket", JSON.stringify(basket));
//           alert("La quantité de votre panier à été modifée");
//           addTotalQuantity(infos, basket);
//           addTotalToPage(infos, basket);
//         });
//       })
//     }
//   }
// }
/****************** modif toutes les quantités  */
// async function changeQuantity(infos, basket) {
//   for (let elem of Object.keys(basket)) {
//     let elemInfos = await infos.find((el) => el._id === elem);
//     for (let color of basket[elem]) {
//       let inputChange = document.querySelectorAll(".itemQuantity");
//       for (let j = 0; j < inputChange.length; j++) {
//         inputChange[j].addEventListener("change", (event) => {
//           event.preventDefault();

//           console.log(event);
//           let currentQuantity = color.quantity;
//           console.log(currentQuantity);
//           const newValue = Number(inputChange[j].value);
//           const updateQuantity = parseInt((currentQuantity[j] = newValue));
//           console.log(updateQuantity);
//           color.quantity = updateQuantity;
//           console.table(basket);
//           localStorage.setItem("basket", JSON.stringify(basket));
//           alert("La quantité de votre panier à été modifée");
//           addTotalQuantity(infos, basket);
//           addTotalToPage(infos, basket);
//         });
//       }
//     }
//   }
// }

async function addProductsToPage(infos, basket) {
  for (let elem of Object.keys(basket)) {
    let elemInfos = await infos.find((el) => el._id === elem);
    for (let color of basket[elem]) {
      // chercher dans le panier, la quantité et couleur commandées
      let displayArticle = document.querySelector("#cart__items");
      let article = document.createElement("article");
      article.classList.add("cart__item");
      article.dataset.id = elemInfos.id;
      article.dataset.color = elemInfos.color;
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
      div4.appendChild(div6);
      let deleteP = document.createElement("p");
      deleteP.classList.add("deleteItem");
      deleteP.textContent = "Supprimer";
      div6.appendChild(deleteP);
      console.log("input", input)
//input.addEventListener("input", console.log)      
input.addEventListener("input", (event) => {
  updatePriceAndQuantity(elemInfos.id, input.value, basket, infos)
   event.preventDefault()
   console.log(event)
})     
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
async function updatePriceAndQuantity(id, newValue, basket, color, productsList, infos, product, elemInfos, elem) {
  // if (basket) {
    let input = document.querySelector(".itemQuantity")
    input = Number(color.quantity); 
   for (let elem of Object.keys(basket)) {
     //let elemInfos = await infos.find((el) => el._id === elem);
     for (let color of basket[elem]) {

  console.log(elem)
  // const itemToUpdate = result.find((x) => x.id === elem)
  // itemToUpdate.quantity = Number(newValue)
  // color.quantity = itemToUpdate.quantity
  // //   localStorage.setItem("basket", JSON.stringify(basket));
  //    alert("La quantité de votre panier à été modifée");
  // addTotalQuantity()
  // addTotalToPage()
  // saveNewDataToCache(item)
}}}
  // for (let elem of Object.keys(basket)) {
  //   let elemInfos = await infos.find((el) => el._id === elem);
  //   for (let color of basket[elem]) { 