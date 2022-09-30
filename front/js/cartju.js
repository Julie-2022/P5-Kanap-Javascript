// Méthode qui fonctionne :
//const cart = []
// retrieveItemsFromCache()
// cart.forEach((item) => displayItem(item))


// function retrieveItemsFromCache() {
//   const numberOfItems = localStorage.length
//   for (let i = 0; i < numberOfItems; i++) {
//     const item = localStorage.getItem(localStorage.key(i)) || ""
//     const itemObject = JSON.parse(item)
//     cart.push(itemObject)
//     console.log(item)
//   }
// }


// déc de "productsInLocalStorage" et transf en objet java :
//localStorage.setItem(key, JSON.stringify(data))
let data = JSON.parse(data.getItem("products"))
console.log(data)

function displayItem(products) {
    console.log("coucou")
//   const article = makeArticle(item)
//   const imageDiv = makeImageDiv(item)
//   article.appendChild(imageDiv)
//   const cardItemContent = makeCartContent(item)
//   article.appendChild(cardItemContent)
//   displayArticle(article)
//   displayTotalQuantity()
//   displayTotalPrice()
    displayCart(products)
}
function displayCart() {
    let displayArticle = document.querySelector('#cart__products')
    let article = document.createElement('article')
    article.classList.add("cart__item")
    article.dataset.id = products.id
    article.dataset.color = products.color
    displayArticle.appendChild(article)

    let div = document.createElement('div')
    div.classList.add('cart__item__img')
    article.appendChild(div) 

    let image = document.createElement('img')
    image.classList.add('cart__item__img')
    image.src = products.imageUrl
    image.alt = products.altTxt
    div.appendChild(image)

    let div2 = document.createElement('div')
    div2.classList.add('cart__item__content')
    article.appendChild(div2)
    let div3 = document.createElement('div')
    div3.classList.add('cart__item__content__description')
    div2.appendChild(div3)
    let kanapName = document.createElement('h2')
    kanapName.innerText = products.name
    div3.appendChild(kanapName)
    let kanapColor = document.createElement('p')
    kanapColor.innerText = products.color
    div3.appendChild(kanapColor)
    let KanapPrice = document.createElement('p')
    KanapPrice.innerText = products.price
    div3.appendChild(KanapPrice)
    let div4 = document.createElement('div')
    div4.classList.add('cart__item__content__settings')
    div2.appendChild(div4)
 
    let quantity = document.createElement('div')
    quantity.classList.add('cart__item__content__settings__quantity')
    div4.appendChild(quantity)

    let p = document.createElement('p')
    p.innerText = 'Qté : '
    quantity.appendChild(p)

    let input = document.createElement('input')
    input.type = 'number'
    input.classList.add('itemQuantity')
    input.name = 'itemQuantity'
    input.min = '1'
    input.max = '100'
    input.value = products.quantity
    quantity.appendChild(input)

    let div6 = document.createElement('div')
    div6.classList.add('cart__item__content__settings__delete')
    div4.appendChild(div6)
    let deleteP = document.createElement('p')
    deleteP.classList.add('deleteItem')
    deleteP.textContent = 'Supprimer'
    div6.appendChild(deleteP)



}

