/**************************** Modif Qty ***********************/
      // function changePriceQty (id, item, newValue) {
      //   for (let id in basket) {
      //   //for (let quantity in basket[id]) {
      //     let changeItem = basket[id].find((item) => item.id === id)
      //     console.log(id)
      //     //changeItem.quantity = Number(newValue)
      //     quantity = changeItem.quantity
      //     //changeItem += parseInt(basket[id][color].quantity);
      //   }
      // //}
      // }
      // changePriceQty()
  

      function changePriceQty () {
       input.addEventListener('change', (event) => {
                 console.log(event);
                const inputValue = input.value;
                console.log(inputValue);
                const currentQuantity = quantity;
                console.log(currentQuantity);
                const updateQuantity = +currentQuantity + +inputValue;
                console.log(updateQuantity);
                quantity = updateQuantity
                console.table(basket);
            localStorage.setItem('basket', JSON.stringify(basket));
            alert("La quantité de votre panier à été modifée");
        })
       }
       changePriceQty ()
      // function changePriceQty (id, quantity) {
      //   //for (let id in basket) {
       
      //     document.querySelector(".itemQuantity");
      //     input.addEventListener(
      //       "change",
      //       function () {
      //         //e.preventDefault();
      //         quantity = this.value;
      //         alert(quantity);
      //         console.log(this.value)

      //       },
      //       false
      //       );
      //       console.log("itemToChange");
      //       // }
          
    // }
    //   changePriceQty();
      /************** TotalPrice ************** */
      let totalPrice = document.querySelector("#totalPrice");
      totalP = 0;
      for (const key of Object.keys(basket)) {
        totalP += parseInt(quantity) * results.price;
        //console.log(totalP)
        totalPrice.innerText = totalP;
      }
      /********************** Ne marche Pas !!!! *************/
      // let totalPrice = document.querySelector("#totalPrice")
      // const totalP = basket[key].reduce((totalP, results) => totalP + results.price * quantity, 0)
      // totalPrice.innerText = parseInt(totalP)
      // console.log(totalP)
      /******************* TotalQty ******************** */
      let totalQuantity = document.querySelector("#totalQuantity");
      console.log(basket);
      console.log(Object.entries(basket).length);
      console.log(Object.values(basket[key]).length);
      totalQty = 0;
      for (let id in basket) {
        for (let color in basket[id]) {
          totalQty += parseInt(basket[id][color].quantity);
        }
      }
      totalQuantity.innerText = totalQty;
    
  



/********************* */

// if (basket) {
//   for (const key of Object.keys(basket)) {
//     fetch(`http://localhost:3000/api/products/${key}`).then((response) =>
//       response.json()
//     );
//     console.log(key);
//   }
// }
/***************************** */

// function displayCart() {
//   let tab = JSON.parse(localStorage.getItem("basket")) || {};

//   let displayArticle = document.querySelector("#cart__items");

//   if (localStorage.getItem("basket") != null) {
//     for (let i = 0; i < tab.length; i++) {
//       let id = tab[i].id;
//       let quantity = tab[i].quantity;
//       let color = tab[i].color;

//       console.table("product in LS", tab);

//       let cartFetch = function () {
//         fetch(`http://localhost:3000/api/products/${id}`)
//           .then((response) => response.json())
//           .then((results) => {
//             let article = createArticle(
//               results.imageUrl,
//               results.altTxt,
//               id,
//               color,
//               results.name,
//               results.price,
//               quantity
//             );
//             displayArticle.appendChild(article);
//           });
//       };
//       cartFetch();
//     }
//   }
// }
// displayCart();
//(src, alt, id, color, name, price, quantity)

//function createArticle(id, color, src, alt, name, price, quantity) {
//let displayArticle = document.querySelector("#cart__items");
//   let article = document.createElement("article");
//   article.classList.add("cart__item");
//   article.dataset.id = results.id;
//   article.dataset.color = results.color;
//   //displayArticle.appendChild(article);

//   let div = document.createElement("div");
//   div.classList.add("cart__item__img");
//   article.appendChild(div);

//   let image = createImage();
//   //let image = document.createElement("img");
//   image.classList.add("cart__item__img");
//   // image.src = results.imageUrl;
//   // image.alt = results.altTxt;
//   div.appendChild(image);

//   let div2 = document.createElement("div");
//   div2.classList.add("cart__item__content");
//   article.appendChild(div2);
//   let div3 = document.createElement("div");
//   div3.classList.add("cart__item__content__description");
//   div2.appendChild(div3);

//   let kanapName = createName();
//   //let kanapName = document.createElement("h2");
//   //kanapName.innerText = results.name;
//   div3.appendChild(kanapName);
//   let kanapColor = document.createElement("p");
//   kanapColor.innerText = color;
//   div3.appendChild(kanapColor);

//   let KanapPrice = createKanapPrice();
//   //let KanapPrice = document.createElement("p");
//   //KanapPrice.innerText = results.price;
//   div3.appendChild(KanapPrice);
//   let div4 = document.createElement("div");
//   div4.classList.add("cart__item__content__settings");
//   div2.appendChild(div4);

//   let qty = document.createElement("div");
//   qty.classList.add("cart__item__content__settings__quantity");
//   div4.appendChild(qty);

//   let p = document.createElement("p");
//   p.innerText = "Qté : ";
//   qty.appendChild(p);

//   let input = document.createElement("input");
//   input.type = "number";
//   input.classList.add("itemQuantity");
//   input.name = "itemQuantity";
//   input.min = "1";
//   input.max = "100";
//   input.value = quantity;
//   qty.appendChild(input);

//   let div6 = document.createElement("div");
//   div6.classList.add("cart__item__content__settings__delete");
//   div4.appendChild(div6);
//   let deleteP = document.createElement("p");
//   deleteP.classList.add("deleteItem");
//   deleteP.textContent = "Supprimer";
//   div6.appendChild(deleteP);
// }

//createArticle();

// function createImage(results) {
//   const image = document.createElement("img");
//   image.src = results.imageUrl;
//   image.alt = results.altTxt;
//   return image;
// }
// function createName() {
//   const kanapName = document.createElement("h2");
//   kanapName.innerText = results.name;
//   return kanapName;
// }
// function createKanapPrice() {
//   const KanapPrice = document.createElement("p");
//   KanapPrice.innerText = results.price;
//   return KanapPrice;
