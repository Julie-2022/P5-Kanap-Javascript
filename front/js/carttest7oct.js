async function displayCart() {
  //console.log("displayCart");

  const basket = JSON.parse(localStorage.getItem("basket")) || {};
  if (basket) {
    // loop through the basket object to get the items from the api
    // 1ère étape :
    //for (const [key, value] of Object.entries(basket)) {
    //console.log([key, value])
    for (const key of Object.keys(basket)) {
      // for (let id in basket) {
      //   for (let color in basket[id]) {
      //for (const key of Object.keys(basket)) {
      let color;
      let quantity;
      console.log(basket[key]);
      console.log(key);

      const results = await fetch(
        `http://localhost:3000/api/products/${key}`
      ).then((response) => response.json());
      // loop through the basket values to get the color and quantity

      for (const value of Object.values(basket[key])) {
        color = value.color;
        qty = value.quantity;
        console.log(color, qty);
        console.log(
          "Données de l'API :",
          results.name,
          results.description,
          results.imageUrl,
          results.altTxt,
          results.price,
          results._id
        );
        console.log(basket);
        // console.table(basket[key]);
        /*************** */
        // for (const color in Object.keys(basket[key])) {
        //   console.table((basket[key][color]));

        //dataBasket(results, color, qty)
        for (let color in basket[key]) {
          Object.values(basket[key]).forEach((color, qty) => {
            let displayArticle = document.querySelector("#cart__items");
            let article = document.createElement("article");
            article.classList.add("cart__item");
            article.dataset.id = results._id;
            article.dataset.color = color.color;
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
            DivQuantity.classList.add(
              "cart__item__content__settings__quantity"
            );
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
            input.value = color.qty; //|| newValue;
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
              let currentQuantity = color.qty;
              console.log(currentQuantity);
              const newValue = Number(input.value);
              const updateQuantity = parseInt((currentQuantity = newValue));
              console.log(updateQuantity);
              color.quantity = updateQuantity;
              console.table(basket);
              localStorage.setItem("basket", JSON.stringify(basket));
              alert("La quantité de votre panier à été modifée");
              //window.location.reload();
              //   totalQuantity();
              //   totalProductsPrice();
            });
          });
        }
      }
    }
  }
}
displayCart();
