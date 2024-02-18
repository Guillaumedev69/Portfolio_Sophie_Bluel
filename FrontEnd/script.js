const swaggerWorks = await fetch("http://localhost:5678/api/works");
const works = await swaggerWorks.json();

function genererWorks(works) {
    const sectionGallery = document.querySelector("#portfolio");
    let divGallery = sectionGallery.querySelector(".gallery");

    // Création de la galerie si il n'y en a pas
    if (!divGallery) {
        divGallery = document.createElement("div");
        divGallery.className = "gallery";
    } else {
        // Suppression de la galerie si existante
        divGallery.innerHTML = "";
    }


    for (let i = 0; i < works.length; i++) {
        const figureGallery = works[i];
        const worksElement = document.createElement("figure");
        const imageElement = document.createElement("img");
            imageElement.src = figureGallery.imageUrl;
        const nomElement = document.createElement("figcaption");
            nomElement.innerText = figureGallery.title;
        worksElement.dataset.categoryId = figureGallery.categoryId; // Recuperation des categories des works
        worksElement.appendChild(imageElement);
        worksElement.appendChild(nomElement);
        divGallery.appendChild(worksElement);
    }
    sectionGallery.appendChild(divGallery);
}

const swaggerCategories = await fetch("http://localhost:5678/api/categories");
const categories = await swaggerCategories.json();

function genererButton(categories) {
    const sectionFiltres = document.querySelector("#portfolio");
    const divFiltres = document.createElement("div");
    divFiltres.className = "btn-filtres";

    const boutonTous = document.createElement("button");
    boutonTous.id = "filtres-tous";
    const nomBoutonTous = document.createElement("h3");
    nomBoutonTous.innerText = "Tous";
    
    sectionFiltres.appendChild(divFiltres);
    divFiltres.appendChild(boutonTous);
    boutonTous.appendChild(nomBoutonTous);

    boutonTous.addEventListener("click", function () {
        document.querySelector(".gallery").innerHTML = "";
        genererWorks(works);
    });

    for (let i = 0; i < categories.length; i++) {
        const filtresGallery = categories[i];
        const filtresCategories = document.createElement("button");
        const nomfiltreCategories = document.createElement("h3");
        nomfiltreCategories.innerText = filtresGallery.name;
        filtresCategories.className ="filtres-id";
        filtresCategories.dataset.categoryId = filtresGallery.id; // Recuperation des id des categories
        const idCategoryFiltres = document.createElement("p");
        idCategoryFiltres.innerText = filtresGallery.id;
        divFiltres.appendChild(filtresCategories);
        filtresCategories.appendChild(nomfiltreCategories);

        filtresCategories.addEventListener("click", function () {
            const worksFiltres = works.filter(function (work) {
                return work.categoryId === parseInt(filtresCategories.dataset.categoryId); // conversion de la data pour la comparaison
            });
            document.querySelector(".gallery").innerHTML = "";
            genererWorks(worksFiltres);
        });
    }
}

genererButton(categories); 
// fonction appelée apres categories pour avoir les filtres au-dessus
genererWorks(works);
