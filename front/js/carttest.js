const allBasket = [];
let displayArticle = document.querySelector("#cart__items");

function getCart() {
  // Initialisation du local storage
  let Basket = JSON.parse(localStorage.getItem("product")) || [];
  console.table(Basket);
  if (Basket === null || Basket === 0 || Basket === [] || Basket.length === 0) {
    let element = document.createElement("div");
    element.innerHTML = "Votre panier est vide";
    displayArticle.appendChild(element);
    console.log("Panier vide");
    return Basket;
  } else Basket !== null || basket !== 0;
  {
    console.log("Des produits sont dans le panier");
    return Basket;
  }
}

basket = getCart();
// Récupération des infos à afficher via l'api
fetch(`http://localhost:3000/api/products`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (produitsAPI) {

    // Tableau vide qui contiendra les données du LS (qty, color) et les données de l'api (id, name, price, color, imageUrl)
    // Pour chaque produit existant dans l'API
    console.log("produits du LS", basket);
    console.log(Array.isArray(produitsAPI))
    console.log(Array.isArray(Basket))

    produitsAPI.map((productAPI) => {
      // Et pour chaque produit existant dans le LS
      basket.map((itemLS) => {
        // on regarde si l'ID correspond entre les deux
        if (productAPI._id === itemLS.id) {
          // Si oui, le produit est trouvé et ajouté dans le allBasket (ou on pourra trouver toutes les infos nécéssaire à l'utilisateur)
          allBasket.push({
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
    console.log("allBasket", allBasket);
    // Créer les bloc HTML
    createProducts(allBasket);
    // Ajoute les events de delete et de changement de quantité
    /*   totalQuantity();*/
    /*  totalPrice();*/
    // eventDeleteProduct();
    // eventupdateQuantity();
  });

// Fonction de creation des éléments
function createProducts(productList) {
  // Si le panier est vide
  for (let product of productList) {
    //creation de l'article

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
    KanapPrice.innerText = product.price + " €";
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
    input.value = product.quantity; //|| newValue;
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
      //  console.log(event);
      let currentQuantity = product.quantity;
      //  console.log(currentQuantity);
      const newValue = Number(input.value);
      const updateQuantity = parseInt((currentQuantity = newValue));
      // console.log(updateQuantity);
      item.quantity = updateQuantity;
      // console.table(basket);
      localStorage.setItem("basket", JSON.stringify(basket));
      alert("La quantité de votre panier à été modifée");
      totalQuantity(updateQuantity);
      totalProductsPrice();
    });
    //window.location.reload();

    /******************* TotalQty ******************** */
    //   function totalQuantity() {
    //     let totalQuantity = document.querySelector("#totalQuantity");
    //     //console.log(basket);
    //     // console.log(Object.entries(basket).length);
    //     // console.log(Object.values(basket[key]).length);
    //     totalQty = 0;
    //     for (let id in basket) {
    //       for (let color in basket[id]) {
    //         totalQty += parseInt(basket[id][color].quantity);
    //       }
    //     }
    //     totalQuantity.innerText = totalQty;
    //   }
    //  // totalQuantity();
    //   /*****************Total Price 1er essai ************** */
    //   //    let totalPrice = document.querySelector("#totalPrice");
    //   // totalP = 0;
    //   // for (let id in basket) {
    //   //   for (let color in basket[id]) {
    //   //     totalP += parseInt((basket[id][color].quantity) * results.price);
    //   //   }
    //   // }
    //   // totalPrice.innerText = totalP;
    //   /************** TotalPrice ********************** */
    //   function totalProductsPrice() {
    //     let totalPrice = 0; //document.getElementById("totalPrice") &&
    //     //console.log(totalPrice);
    //     let totalPriceId = 0;
    //     totalP = 0;
    //     for (let id in basket) {
    //       for (let color in basket[id]) {
    //         totalPriceId = parseInt(basket[id][color].quantity * results.price);

    //         totalP += totalPriceId;
    //         //console.log("Total prix/id et du panier", totalPriceId, totalP);
    //         //console.log("basket[id][color].quantity =",basket[id][color].quantity);
    //         //console.log(results.price)
    //         //console.log(basket[id][color].quantity * results.price);
    //       }
    //     }
    //     document.getElementById("totalPrice").innerText = totalP;
    //   }
    //  // totalProductsPrice();
    /********************************************* */
  }
}
