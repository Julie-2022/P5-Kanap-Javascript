function FillingTab() {
  let tab = [];
  if (localStorage.getItem("basket") != null) {
    tab = JSON.parse(localStorage.getItem("basket"));
  }
  return tab;
}

function displayCart() {
  let tab = FillingTab();
  let displayArticle = document.querySelector("#cart__items");

  if (localStorage.getItem("basket") != null) {
    for (let i = 0; i < tab.length; i++) {
      let id = tab[i].id;
      let quantity = tab[i].quantity;
      let color = tab[i].color;

      console.table("product in LS", tab);

      let cartFetch = function () {
        fetch(`http://localhost:3000/api/products/${id}`)
          .then((response) => response.json())
          .then((data) => {
            let article = createArticle(
              data.imageUrl,
              data.altTxt,
              id,
              color,
              data.name,
              data.price,
              quantity
            );
            displayArticle.appendChild(article);
          });
      };
      cartFetch();
    }
  }
}
displayCart();
//(src, alt, id, color, name, price, quantity)
function createArticle(src, alt, id, color, name, price, quantity) {
  //let displayArticle = document.querySelector("#cart__items");
  let article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = id;
  article.dataset.color = color;
  //displayArticle.appendChild(article);

  let div = document.createElement("div");
  div.classList.add("cart__item__img");
  article.appendChild(div);

  let image = createImage(src, alt);
  //let image = document.createElement("img");
  image.classList.add("cart__item__img");
  // image.src = data.imageUrl;
  // image.alt = data.altTxt;
  div.appendChild(image);

  let div2 = document.createElement("div");
  div2.classList.add("cart__item__content");
  article.appendChild(div2);
  let div3 = document.createElement("div");
  div3.classList.add("cart__item__content__description");
  div2.appendChild(div3);

  let kanapName = createName(name);
  //let kanapName = document.createElement("h2");
  //kanapName.innerText = data.name;
  div3.appendChild(kanapName);
  let kanapColor = document.createElement("p");
  kanapColor.innerText = color;
  div3.appendChild(kanapColor);

  let KanapPrice = createKanapPrice(price + " €");
  //let KanapPrice = document.createElement("p");
  //KanapPrice.innerText = data.price;
  div3.appendChild(KanapPrice);
  let div4 = document.createElement("div");
  div4.classList.add("cart__item__content__settings");
  div2.appendChild(div4);

  let qty = document.createElement("div");
  qty.classList.add("cart__item__content__settings__quantity");
  div4.appendChild(qty);

  let p = document.createElement("p");
  p.innerText = "Qté : ";
  qty.appendChild(p);

  let input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = quantity;
  qty.appendChild(input);

  let div6 = document.createElement("div");
  div6.classList.add("cart__item__content__settings__delete");
  div4.appendChild(div6);
  let deleteP = document.createElement("p");
  deleteP.classList.add("deleteItem");
  deleteP.textContent = "Supprimer";
  div6.appendChild(deleteP);
}

createArticle();

function createImage(src, alt) {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  return image;
}
function createName(name) {
  const kanapName = document.createElement("h2");
  kanapName.innerText = name;
  return kanapName;
}
function createKanapPrice(price) {
  const KanapPrice = document.createElement("p");
  KanapPrice.innerText = price;
  return KanapPrice;
}
