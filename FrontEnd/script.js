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

// fonction appelée apres categories pour avoir les filtres au-dessus
genererWorks(works);

const token = localStorage.getItem("token");
console.log(token);

function editModeHEader() {
    // editMode Header
        const editNewHeader = document.querySelector("header");
        editNewHeader.className = "editHeader"; // class pour le nouveau Header
        const h1Header = document.querySelector("header h1"); // Recupération  du H1
        const navHeader = document.querySelector("header nav"); // Recupération  du Nav
        const divElemNewHeader = document.createElement("div"); // Div pour englober H1 + Nav
        divElemNewHeader.className = "elementNewHeader";
        divElemNewHeader.appendChild(h1Header);
        divElemNewHeader.appendChild(navHeader);
        editNewHeader.appendChild(divElemNewHeader); // Appel du nouvel Header
        const divEditHeader = document.createElement("div"); // Création de la div du mode édition
        divEditHeader.className = "editModeHeader";
        const iconEditHeader = document.createElement("img"); // intégration de l'icon
        iconEditHeader.src = "assets/icons/iconEditWhite.png";
        const pEditHeader = document.createElement("p"); // création du p "Mode édition"
        pEditHeader.innerText = "Mode édition";
        divEditHeader.appendChild(iconEditHeader);
        divEditHeader.appendChild(pEditHeader);
        editNewHeader.insertBefore(divEditHeader, editNewHeader.firstChild); // div mode éditon placée au début du header

        const loginNavEdit = document.querySelector("nav li:nth-child(3) a");
        loginNavEdit.textContent = "logout";  // remplacement de login par logout

    // suppression du token à la déconnexion
        loginNavEdit.addEventListener("click", function () { 
            localStorage.removeItem("token");
        })
};

function editModePorfolio() {
    // editMode Porfolio
        const editPorfolio = document.querySelector("#portfolio h2"); // Récuperation du place dans le h2
        const iconEditPortfolio = document.createElement("img"); // intégration de l'icon
        iconEditPortfolio.src = "assets/icons/iconEditBlack.png";
        const spanEditPorfolio = document.createElement("span"); // Création du span
        const spanTexte = document.createTextNode("modifier");
        const aSpanTexte = document.createElement("a"); // Création d'un lien vers la modal
        aSpanTexte.href ="#";
        aSpanTexte.appendChild(iconEditPortfolio);
        aSpanTexte.appendChild(spanTexte); // Mise en href du texte et de l'icon
        spanEditPorfolio.appendChild(aSpanTexte); // Appel du href dans le Span
        editPorfolio.appendChild(spanEditPorfolio); // mise a la suite du H2 le Span

    // Suppression des filtres
        const suppFiltres = document.getElementsByClassName(".btn-filtres");
        suppFiltres.className = "suppFiltres";
};

function modale1() {
    const bodyModale1 = document.querySelector("body");

    const overlay = document.createElement("div");
    overlay.className ="overlay";

    const modale1container = document.createElement("div");
    modale1container.className = "modale1Contain";

    const btnCloseModale1 = document.createElement("button");
    btnCloseModale1.className = "modaleClose";
    const iconCloseModale1 = document.createElement("img");
    iconCloseModale1.src = "assets/icons/iconCLoseBlack.png";

    const h3Modale = document.createElement("h3");
    h3Modale.innerHTML = "Galerie photo";

    const modaleGalerie = document.createElement("div");
    modaleGalerie.className = "modaleGalerie";

    const btnAjoutModale1 = document.createElement("button");
    btnAjoutModale1.className = "modaleBtnAjout";
    btnAjoutModale1.textContent = "Ajouter une photo";

    btnCloseModale1.appendChild(iconCloseModale1);
    modale1container.appendChild(btnCloseModale1);
    modale1container.appendChild(h3Modale);
    modale1container.appendChild(modaleGalerie);
    modale1container.appendChild(btnAjoutModale1);
    overlay.appendChild(modale1container);
    bodyModale1.appendChild(overlay);
    
};
// Gestion du mode editon apres connexion
if (token) {
    editModeHEader();
    editModePorfolio();
    // Ouverture Modale
    const btnOpenModale = document.querySelector("#portfolio h2")
    btnOpenModale.addEventListener("click", function (){
    modale1();
})

}else{
    // Pas de mode edition si token pas présent
        genererButton(categories); 
        genererWorks(works);
}
