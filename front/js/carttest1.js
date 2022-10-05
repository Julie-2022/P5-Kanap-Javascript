//Récuperation du local storage
const productLocalStorage = JSON.parse(localStorage.getItem("basket"));
console.table(productLocalStorage);
basketFull = [];

//let productFiltred = [];

function getProducts() {
  //Récupération des données de base via l'api
  fetch(`http://localhost:3000/api/products/`)
    .then(function (dataApi) {
      if (dataApi.ok) {
        return dataApi.json();
      }
    })
    .then(function (dataApi) {
      // mettre les données API dans un tableau
      const products = dataApi;
      dataTable = [];
      dataTable.push(products);
      console.table(products);
      console.log(products);
    })
    .then(function () {
      const basketInTable = []; // mettre le LS dans un tableau
      basketInTable.push(productLocalStorage);

      console.table(basketInTable);
      //let list = listProduct;
      // if (productLocalStorage && productLocalStorage.length) {
      if (productLocalStorage != null) {
        // si panier plein
        //
        // Pour chaque produit existant dans l'API
        dataTable.map((dataTable) => {
          // Et pour chaque produit existant dans le LS
          basketInTable.map((productLocalStorage) => {
            //productLocalStorage.map((productLocalStorage) => {
            // on regarde si l'ID correspond entre les deux
            // if (productLocalStorage.id == dataTable._id) {
            //if (dataTable._id == basketInTable.id) {
            if (basketInTable.includes(dataTable._id)) {
              console.log(productLocalStorage);
              // Si oui, le produit est trouvé et ajouté dans le panierComplet (ou on pourra trouver toutes les infos nécéssaire à l'utilisateur)
              basketFull.push({
                id: dataTable._id,
                name: dataTable.name,
                price: dataTable.price,
                color: productLocalStorage.color,
                quantity: productLocalStorage.quantity,
                imageUrl: dataTable.imageUrl,
              });
              console.log("données completées", basketFull);
            }
          });
        });
        console.log("panier plein");
        //
        //productInBasket = basketInTable.map((product) => product.id);
        // console.log("mappé !");
        // productFiltred = dataTable.filter((element) =>
        //   productInBasket.includes(element._id)
        // );
        // console.log("filtrés");

        displayCart();
        /* ici appel des fonctions : modifyQuantity(), deleteArticle(), getTotals() */
      } else {
        // si panier vide
        console.log("panier vide");
        cartEmpty = document.getElementById("cart__items");
        let emptyBasket = document.createElement("p");
        emptyBasket.innerText = "Votre Panier est vide";
        cartEmpty.appendChild(emptyBasket);
      }
    })
    .catch(function (err) {
      console.log("api error", err);
    });
}
getProducts();

function createArticle (src, alt, id, color, title, price, quantite) {
  for (let product in basketFull) {
    // const productSelected = basketInTable.find(
    //   p => p._id == basketInTable[product].id
    // );
    // productSelected = dataTable.filter(element => {
    //   if (productInBasket.includes(product.id))
    //   //return dataTable.find(product.altTxt)
    //   return dataTable.indexOf(basketInTable.id)
    //})
    //console.log(element._id)

    let displayArticle = document.querySelector("#cart__items");
    let article = document.createElement("article");
    article.classList.add("cart__item");
    article.dataset.id = product.id;
    article.dataset.color = product.color;
    displayArticle.appendChild(article);

    let div = document.createElement("div");
    div.classList.add("cart__item__img");
    article.appendChild(div);

    let image = document.createElement("img");
    image.classList.add("cart__item__img");
    image.src = product.imageUrl;
    image.alt = product.altTxt;
    div.appendChild(image);

    let div2 = document.createElement("div");
    div2.classList.add("cart__item__content");
    article.appendChild(div2);
    let div3 = document.createElement("div");
    div3.classList.add("cart__item__content__description");
    div2.appendChild(div3);
    let kanapName = document.createElement("h2");
    kanapName.innerText = product.name;
    div3.appendChild(kanapName);
    let kanapColor = document.createElement("p");
    kanapColor.innerText = product.color;
    div3.appendChild(kanapColor);

    
    let KanapPrice = document.createElement("p");
    KanapPrice.innerText = product.price;
    div3.appendChild(KanapPrice);
    let div4 = document.createElement("div");
    div4.classList.add("cart__item__content__settings");
    div2.appendChild(div4);

    let quantity = document.createElement("div");
    quantity.classList.add("cart__item__content__settings__quantity");
    div4.appendChild(quantity);

    let p = document.createElement("p");
    p.innerText = "Qté : ";
    quantity.appendChild(p);

    let input = document.createElement("input");
    input.type = "number";
    input.classList.add("itemQuantity");
    input.name = "itemQuantity";
    input.min = "1";
    input.max = "100";
    input.value = product.quantity;
    quantity.appendChild(input);

    let div6 = document.createElement("div");
    div6.classList.add("cart__item__content__settings__delete");
    div4.appendChild(div6);
    let deleteP = document.createElement("p");
    deleteP.classList.add("deleteItem");
    deleteP.textContent = "Supprimer";
    div6.appendChild(deleteP);
  }
}

// createArticle();
