// Fonction auto appelée
(async function() {
    // Récupérer l'id du kanap dans une url
    const productId = getProductId()
     //console.log(productId) //= vérif 1
    // fetch notre kanap
    const products = await getProduct(productId)
    //console.log(product)// vérif 2 si on l'a bien récup
    // complète les infos du kanap clické
    hydrateKanap(products)
})()

// Fct qui permet de récupérer l'id via la console par l'objet "location" puis "location.href" puis "location.href" puis "new URL(location.href)" puis "new URL(location.href).get("id") => donne l'id.
function getProductId() {
    return new URL(location.href).searchParams.get('id')
}
let products = [] /**/
// Copie de getKanap + concaténation "productId"
async function getProduct(productId) {
    try {
        const res = await fetch(`http://localhost:3000/api/products/${productId}`)
        products = await res.json()
        return products
    } catch (error) {
        alert(error)
    }
}

function hydrateKanap(products) {
    let pageTitle = document.querySelector('head title')
    pageTitle.innerText = products.name
    
    let itemImg = document.createElement('img')/* img */
    itemImg.src = products.imageUrl
    //console.log(product.imageUrl)
    itemImg.alt = products.altTxt
    //console.log(product.altTxt)
    let divImg = document.getElementsByClassName('item__img')
    divImg[0].appendChild(itemImg)
    
    let itemTitle = document.getElementById('title')/* title */
    itemTitle.innerText = products.name
    
    let itemPrice = document.getElementById('price')/* price */
    itemPrice.innerText = products.price
    
    let itemDescription = document.getElementById('description')/* description */
    itemDescription.innerText = products.description
    
    let selectColor = document.getElementById('colors')/* colors */
            //console.log(products.colors)
        products.colors.forEach(color => {
            //console.log(document.createElement('option'))
        let colorsOption = document.createElement('option')
        colorsOption.innerText = `${color}`
        colorsOption.value = `${color}`
        selectColor.appendChild(colorsOption)
            //console.log(colorsOption)
    });
    //addBasket()
}
hydrateKanap()
/************************* */
// function saveBasket(basket) {
//     window.localStorage.setItem('basket', JSON.stringify(basket))
// }
// function getBasket() {
//      // Benjamin : let basket = JSON.parse(localStorage.getItem("basket", JSON.stringify)) || {}
//     let basket = localStorage.getItem('basket')
//     if (basket == null) {
//         return {}  // Benjamin : {}
//     } else {
//         return JSON.parse(basket)
//     }
// }
/******************************** */
// bouton : 1. Vérifier si le produit existe dans le panier
// 2. Si oui, vérifier si la couleur existe
// 3.1 Si oui, ajouter la quantité
// 3.2 Si non, ajouter la couleur et la quantité
// 4. Si non, ajouter le produit et la couleur et la quantité
// 5. Sauvegarder le panier(localStorage)
const addBasket = () => {
    let productId = getProductId()  
    
    let button = document.getElementById('addToCart')
    button.addEventListener('click', (e) => {
        e.preventDefault();
        let (basket[productId]) = JSON.parse(localStorage.getItem('basket'))

        let colorsOption = document.getElementById("colors").value
        let numberSelect = document.querySelector('#quantity').value
// pour cloner un objet, (+ objet vide) ordre d'importance = droite à gauche)
        const fusionColor = Object.assign({}, basket, {
            _id: productId,
            color: colorsOption, 
            quantity: numberSelect,
        })
        console.log(fusionColor)

        if (basket[productId] == null) {
            basket[productId] = []
            basket[productId].push(fusionColor)
            console.log(basket[productId])
            localStorage.setItem('basket', JSON.stringify(basket[productId]))
/* =================== cart.js ligne 1 à 7 ========================== */
        } else if (basket[productId] != null) {
            for (i=0; i < basket[productId].length; i++) {
                console.log("test") // si pas null test
                if (basket[productId][i]._id == productId && 
                    basket[productId][i].colors == colorsOption.value) { // si mm id et mm couleur
                return ( // tjrs avec virgule pas point-virgule
                    basket[productId][i].quantity = parseInt(basket[productId][i].quantity) + parseInt(numberSelect),
                    console.log("quantity++"),
                    localStorage.setItem('basket', JSON.stringify(basket[productId])),
                    (basket[productId] = JSON.parse(localStorage.getItem('basket')))
                )
            }
        }
    
        for (i=0; i < basket[productId].length; i++) {  
            console.log("pas null") // si pas null test 2
            if ((basket[productId][i]._id == productId 
                && basket[productId][i].colors != colorsOption.value) 
                || basket[productId][i]._id != productId) {
                const otherColor = Object.assign({}, products, {
                color: colorsOption.value 
                })
                console.log(otherColor)
                return (
                //basket[productId][i].colors == colorsOption.value,    
                    basket[productId] = [],
                    basket[productId].push(otherColor),
                    console.log("anotherColor"), // si new color    
                //console.log(basket[productId]),
                    localStorage.setItem('basket', JSON.stringify(basket[productId])),
                    basket[productId] = JSON.parse(localStorage.getItem('basket'))
                ) 
            }
        }
        //getBasket()//console.log(basket)
        return (basket[productId]) = JSON.parse(localStorage.getItem('basket'))
        }
    })
}
addBasket()

    

