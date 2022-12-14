// créer un tableau vide
let products = [];
// requête fetchKanap de manière asynchrone pour aller chercher les kanap et d'attendre qu'il aille chercher la requête fetch
//fetch("http://localhost:3000/api/products")
// .then((res) => res.json())
// .then((dataJson) => console.log(dataJson))

let getKanaps = async () => {
  await fetch("http://localhost:3000/api/products")
    // Traiter la réponse en .json
    .then(res => res.json())
    // Traiter la promesse, les kanap
    .then(kanapList => {
      // remplir le tableau avec la promesse
      products = kanapList;
      ///console.log(products);
    })
    .catch(error => displayError());
};

// On attend getKanaps pour afficher kanapsDisplay
let kanapsDisplay = async () => {
  await getKanaps();
  // Fonction qui génère l'affichage de tous les kanaps :
  for (let product of products) {
    // création des éléments html
    // ancre
    let itemsAnchor = document.createElement("a");
    // remplir
    itemsAnchor.href += `./product.html?id=${product._id}`;
    // ajout de l'élément dans le DOM
    document.getElementById("items").appendChild(itemsAnchor);

    // article
    let itemsArticle = document.createElement("article");
    itemsAnchor.appendChild(itemsArticle);
    // image
    let itemsImg = document.createElement("img");
    itemsImg.src = product.imageUrl;
    itemsImg.alt = `Lorem ipsum dolor sit amet, ${product.name}`;
    itemsArticle.appendChild(itemsImg);
    // nom
    let itemsName = document.createElement("h3");
    itemsName.classList.add("productName");
    itemsName.innerText = product.name;
    itemsArticle.appendChild(itemsName);
    // description
    let itemsDescription = document.createElement("p");
    itemsDescription.classList.add("productDescription");
    itemsDescription.innerText = product.description;
    itemsArticle.appendChild(itemsDescription);
  }
};
// Affiche tous les kanaps
kanapsDisplay();

// Message d'erreur en cas d'échec de la requête fetch qui récupère les données de tous les Kanaps.
function displayError() {
  let articleError = document.createElement("article");
  articleError.innerHTML = "Il n'y a aucun article disponible à ce jour.<br>Merci de réessayer ultérieurement.<br>Si ce problème persiste, n'hésitez pas à nous contacter.";
  articleError.style.paddingBottom = "25px";
  articleError.style.textAlign = "center";
  articleError.style.lineHeight = "200%";
  let parent = document.getElementById("items");
  parent.appendChild(articleError);
}

