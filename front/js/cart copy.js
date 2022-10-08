async function displayCart() {
  //console.log("displayCart");

  const basket = JSON.parse(localStorage.getItem("basket")) || {};
  if (basket) {
    // loop through the basket object to get the items from the api
    // 1ère étape :
    // for (const [key, value] of Object.entries(basket)) {
    //   console.log(key, value)
    for (const key of Object.keys(basket)) {
      let color;
      let quantity;
      const results = await fetch(
        `http://localhost:3000/api/products/${key}`
      ).then((response) => response.json());
      //console.log(key)
      // loop through the basket values to get the color and quantity
      for (const value of Object.values(basket[key])) {
        color = value.color;
        quantity = value.quantity;
      }
      // console.log(results.imageUrl, results.altTxt, results.id, results.colors, results.name, results.price)
      //console.log(basket);
      // console.table(basket[key]);
      Object.values(basket[key]).forEach((color) => {
        //console.log(color, quantity);
        console.log(basket[key]);

        let displayArticle = document.querySelector("#cart__items");
        let article = document.createElement("article");
        article.classList.add("cart__item");
        article.dataset.id = results.id;
        article.dataset.color = results.color;
        displayArticle.appendChild(article);

        let div = document.createElement("div");
        div.classList.add("cart__item__img");
        article.appendChild(div);

        let image = document.createElement("img");
        image.classList.add("cart__item__img");
        image.src = results.imageUrl;
        image.alt = results.altTxt;
        div.appendChild(image);

        let div2 = document.createElement("div");
        div2.classList.add("cart__item__content");
        article.appendChild(div2);
        let div3 = document.createElement("div");
        div3.classList.add("cart__item__content__description");
        div2.appendChild(div3);
        let kanapName = document.createElement("h2");
        kanapName.innerText = results.name;
        div3.appendChild(kanapName);
        let kanapColor = document.createElement("p");
        kanapColor.innerText = color.color;

        div3.appendChild(kanapColor);
        let KanapPrice = document.createElement("p");
        KanapPrice.innerText = results.price + " €";
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
        /****************** Change Qty *************** */
        input.addEventListener("change", (event) => {
          console.log(event);
          let currentQuantity = color.quantity;
          console.log(currentQuantity);
          const newValue = Number(input.value);
          const updateQuantity = parseInt((currentQuantity = newValue));
          console.log(updateQuantity);
          color.quantity = updateQuantity;
          console.table(basket);
          localStorage.setItem("basket", JSON.stringify(basket));
          alert("La quantité de votre panier à été modifée");
          totalQuantity(updateQuantity);
          totalProductsPrice();
        });
        //window.location.reload();
      });

      /********************** Suppr *************************** */
      function deleteProduct() {
        if (basket) {
          // for (const key of Object.keys(basket)) {
          //   let color;
          //   let quantity;
          for (const [key, value] of Object.entries(basket)) {
            console.log(key, value);
            console.log(basket);
            // //on recupere le btn delete
            let deleteBtn = document.querySelectorAll(".deleteItem");
            // //on loop a travers tt les btn delete
            for (let i = 0; i < deleteBtn.length; i++) {
              //   //event listener click
              //deleteBtn[i].onclick = (event) => { "on" = addEventListener
              deleteBtn[i].addEventListener (
                "click",
                (event) => {
                  event.preventDefault();
                  //     //on recupere l'id et la couleur

                  /**/ let basket = JSON.parse(localStorage.getItem("basket"));

                  let deleteId = key;
                  let deleteColor = color;
              //    let selectIdDelete = results.id;
                  console.log(deleteId);
                  console.log(deleteColor);

                  const targetIndex = basket[key];
                  console.log("targetIndex", targetIndex);
                  console.log(targetIndex !== -1); // return true ou false si la couleur est stockée ou pas
                  let articleToDelete = document.querySelector(
                    `article[data-id="${deleteId}"][data-color="${deleteColor}"]`
                    );
                    articleToDelete = event.target.closest("article");
                    //articleToDelete.remove()
                    console.log("avant remove article", basket);
                    articleToDelete.remove("article");
                    console.log("après remove article", basket);
                    console.log(articleToDelete, basket, "element à suppr");
                    console.log("key", key, deleteId);
                    /************** */
                    //On met à jour le LS du navigateur

                   /*----- Test renvoi 1 [] => */
                   console.log("avant splice", basket);
                      basket[key].splice(targetIndex, 1);
                      console.log("après splice", basket);
                      /*------*/
                  localStorage.setItem("basket", JSON.stringify(basket))                
                  //window.location.reload();
                },
                false
              );
            }
          }
        } else {
          alert("Votre panier est vide");
        }
      }
      deleteProduct();
      /******************* TotalQty ******************** */
      function totalQuantity() {
        let totalQuantity = document.querySelector("#totalQuantity");
        //console.log(basket);
        // console.log(Object.entries(basket).length);
        // console.log(Object.values(basket[key]).length);
        totalQty = 0;
        for (let id in basket) {
          for (let color in basket[id]) {
            totalQty += parseInt(basket[id][color].quantity);
          }
        }
        totalQuantity.innerText = totalQty;
      }
      totalQuantity();
      /*****************Total Price 1er essai ************** */
      //    let totalPrice = document.querySelector("#totalPrice");
      // totalP = 0;
      // for (let id in basket) {
      //   for (let color in basket[id]) {
      //     totalP += parseInt((basket[id][color].quantity) * results.price);
      //   }
      // }
      // totalPrice.innerText = totalP;
      /************** TotalPrice ********************** */
      function totalProductsPrice() {
        let totalPrice = 0; //document.getElementById("totalPrice") &&
        console.log(totalPrice);
        let totalPriceId = 0;
        totalP = 0;
        for (let id in basket) {
          for (let color in basket[id]) {
            totalPriceId = parseInt(basket[id][color].quantity * results.price);

            totalP += totalPriceId;
            console.log("Total prix/id et du panier", totalPriceId, totalP);
            console.log(
              "basket[id][color].quantity =",
              basket[id][color].quantity
            );
            //console.log(results.price)
            console.log(basket[id][color].quantity * results.price);
          }
        }
        document.getElementById("totalPrice").innerText = totalP;
      }
      totalProductsPrice();
      /********************************************* */   
    }
  }
}
displayCart();