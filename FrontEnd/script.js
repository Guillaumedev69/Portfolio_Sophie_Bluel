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
    
    sectionFiltres.appendChild(divFiltres);

    // Créer et configurer le bouton "Tous"
    const boutonTous = document.createElement("input");
    boutonTous.type = "radio";
    boutonTous.id = "filtres-tous";
    boutonTous.name = "category";
    boutonTous.value = "tous";
    boutonTous.checked = true; // Bouton cliqué par défaut
    const labelTous = document.createElement("label");
    labelTous.htmlFor = "filtres-tous";
    labelTous.innerText = "Tous";
    divFiltres.appendChild(boutonTous);
    divFiltres.appendChild(labelTous);

    // Ajouter un gestionnaire d'événements pour le bouton "Tous"
    boutonTous.addEventListener("click", function () {
        document.querySelector(".gallery").innerHTML = "";
        genererWorks(works);
    });

    // Créer et configurer les autres boutons basés sur les catégories
    for (let i = 0; i < categories.length; i++) {
        const categorie = categories[i];
        const boutonCategorie = document.createElement("input");
        boutonCategorie.type = "radio";
        boutonCategorie.id = `filtres-${categorie.id}`;
        boutonCategorie.name = "category";
        boutonCategorie.value = categorie.id.toString();
        const labelCategorie = document.createElement("label");
        labelCategorie.htmlFor = `filtres-${categorie.id}`;
        labelCategorie.innerText = categorie.name;
        divFiltres.appendChild(boutonCategorie);
        divFiltres.appendChild(labelCategorie);

        // Ajouter un gestionnaire d'événements pour chaque bouton de catégorie
        boutonCategorie.addEventListener("click", function () {
            const worksFiltres = works.filter(function (work) {
                return work.categoryId === parseInt(boutonCategorie.value);
            });
            document.querySelector(".gallery").innerHTML = "";
            genererWorks(worksFiltres);
        });
    }
}

// fonction appelée apres categories pour avoir les filtres au-dessus
genererWorks(works);

const token = localStorage.getItem("token");

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
        const editPorfolio = document.querySelector("#portfolio h2"); // Récuperation du placement dans le h2
        const iconEditPortfolio = document.createElement("img"); // intégration de l'icon
        iconEditPortfolio.src = "assets/icons/iconEditBlack.png";
        const spanEditPorfolio = document.createElement("span"); // Création du span
        const spanTexte = document.createTextNode("modifier");
        const btnSpanTexte = document.createElement("button");
        btnSpanTexte.appendChild(iconEditPortfolio);
        btnSpanTexte.appendChild(spanTexte); // Mise en bouton du texte et de l'icon
        spanEditPorfolio.appendChild(btnSpanTexte); // Appel du href dans le Span
        editPorfolio.appendChild(spanEditPorfolio); // mise a la suite du H2 le Span

    // Suppression des filtres
        const suppFiltres = document.getElementsByClassName(".btn-filtres");
        suppFiltres.className = "suppFiltres";
};



function modale() {
    // Placement sur le body
    const bodyModale = document.querySelector("body"); 
    // Creation de l'arriere plan de la modale
    const overlay = document.createElement("div"); 
    overlay.className ="overlay";
    // Creation du container de la modale
    const modalecontainer = document.createElement("div"); 
    modalecontainer.className = "modale1Contain";
    // Mise en place du Header de la Modale
    const modaleHeader = document.createElement("div");
    modaleHeader.className = "modaleHeader";
    const btnCloseModale = document.createElement("button");
    btnCloseModale.className = "modaleClose";
    const iconCloseModale = document.createElement("img");
    iconCloseModale.src = "assets/icons/iconCLoseBlack.png";
    // H3 pour la modale d'accueil
    const h3Modale = document.createElement("h3");
    h3Modale.innerText = "Galerie photo";
    // Creation galerie
    const modaleGalerie = document.createElement("div");
    modaleGalerie.className = "modaleGalerie";
    //ligne de separation
    const ligneSeparation = document.createElement("div")
    ligneSeparation.className = "ligneSepaModale"
    // Creation du btn ajout photo
    const btnAjoutModale = document.createElement("button");
    btnAjoutModale.className = "modaleBtnAjout";
    btnAjoutModale.textContent = "Ajouter une photo";
    // Mise en lien des differents éléments de la modale
    btnCloseModale.appendChild(iconCloseModale);
    modaleHeader.appendChild(btnCloseModale);
    modalecontainer.appendChild(modaleHeader)
    modalecontainer.appendChild(h3Modale);
    modalecontainer.appendChild(modaleGalerie);
    modalecontainer.appendChild(ligneSeparation)
    modalecontainer.appendChild(btnAjoutModale);
    overlay.appendChild(modalecontainer);
    bodyModale.appendChild(overlay);
    
    function fermerModale(event) {
        const modale = document.querySelector(".modale1Contain");
        const overlay = document.querySelector(".overlay");
        
        // Vérifier si modale est null avant d'utiliser la methode
        // methode pour eviter un defaut dans la console
        //"Uncaught TypeError: Cannot read properties of null (reading 'contains')".
        if (modale && (event.target === overlay || (!modale.contains(event.target) && event.target !== modale))) {
            modalecontainer.remove();
            overlay.remove();
        }
    }
    
    overlay.addEventListener("click", fermerModale)
    // Fermer la modale grâce au btn
    btnCloseModale.addEventListener("click",function () {
        modalecontainer.remove()
        overlay.remove()
    })
    // affichage de la galerie de la modale
    function genererWorksModale(works) {
        const sectionGalerieModale = document.querySelector(".modaleGalerie");

        for (let i = 0; i < works.length; i++) {
            const figureGalerie = works[i];
            const worksElement = document.createElement("figure");
            worksElement.id = figureGalerie.id;
            const imageElement = document.createElement("img");
                imageElement.src = figureGalerie.imageUrl;
                imageElement.className = "imgGalerie"
            const iconSupp = document.createElement("img")
            iconSupp.src = "assets/icons/iconTrash.png"
            iconSupp.className = "iconTrash"
            const backgrdnIconTrash = document.createElement("img")
            backgrdnIconTrash.src = "assets/icons/iconBackgrnd.png"
            backgrdnIconTrash.className = "iconBackgrndTrash"
            const btnTrash = document.createElement("button")
            btnTrash.className = "btnTrash"
            btnTrash.appendChild(backgrdnIconTrash)
            btnTrash.appendChild(iconSupp)
            worksElement.appendChild(btnTrash)
            worksElement.appendChild(imageElement);
            sectionGalerieModale.appendChild(worksElement);  
            // Mise en service du btn Trash avec suppression dans l'API
            btnTrash.addEventListener("click", async function () {                
                // Supprimer l'élément de la galerie modale
                worksElement.remove(); 
                            
                const Id = figureGalerie.id;
                const deleteWorks = await fetch(`http://localhost:5678/api/works/${Id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },                
                });
            });
        }       
    }
    genererWorksModale(works);
    //ouverture mode ajout de fichier
    btnAjoutModale.addEventListener("click", function () {
        modalecontainer.remove();
        overlay.remove();
        modaleAjoutWorks();    
    });
};

function modaleAjoutWorks() {
    const bodyModale = document.querySelector("body"); 
    // Creation de l'arriere plan de la modale
    const overlay = document.createElement("div"); 
    overlay.className ="overlay";
    // Creation du container de la modale
    const modaleContainerAjout = document.createElement("div"); 
    modaleContainerAjout.className = "modaleAjoutContain";
    // Creation div pour les icons
    const divIconModaleAjout = document.createElement("div")
    divIconModaleAjout.className = "divIconRetourClose"
    // btn pour revenir à la premiere modale
    const btnRetourModale = document.createElement("button");
    btnRetourModale.className = "modaleRetour";
    const iconRetourModale = document.createElement("img");
    iconRetourModale.src = "assets/icons/iconReturn.png";
    // btn pour fermer la modale
    const btnCloseModale = document.createElement("button");
    btnCloseModale.className = "modaleClose";
    const iconCloseModale = document.createElement("img");
    iconCloseModale.src = "assets/icons/iconCLoseBlack.png";
    // H3 pour la modale d'ajout de photo
    const ajoutModaleH3 = document.createElement("h3");
    ajoutModaleH3.innerText = "Ajout photo";
    // Creation du form d'ajout de works
    const ajoutModaleForm = document.createElement("form");
    ajoutModaleForm.id = "formAjoutFichier"
    ajoutModaleForm.method = "POST"
    const divAjoutFichier = document.createElement("div")
    divAjoutFichier.className = "divAjoutFichier"
    const divAjoutFichierImg = document.createElement("img")
    divAjoutFichierImg.src = "assets/icons/iconAjoutFichierImg.png"
    const ajoutModaleInputAjoutImg = document.createElement("input");
    ajoutModaleInputAjoutImg.setAttribute("type","file");
    ajoutModaleInputAjoutImg.setAttribute("id","nouvelleImage");
    const ajoutModaleLabelTitre = document.createElement("label")
    ajoutModaleLabelTitre.textContent = "Titre";
    const ajoutModaleInputTitre = document.createElement("input");
    ajoutModaleInputTitre.setAttribute("type","texte");
    const ajoutModaleLabelCatégorie = document.createElement("label");
    ajoutModaleLabelCatégorie.textContent = "Catégorie";
    const ajoutModaleInputCatégorie = document.createElement("input");
    ajoutModaleInputCatégorie.setAttribute("type","number");
    const ligneSeparation = document.createElement("div")
    ligneSeparation.className = "ligneSepaModale"
    const ajoutModaleSubmitValider = document.createElement("button");
    ajoutModaleSubmitValider.type = "submit";
    ajoutModaleSubmitValider.textContent = "Valider";
    btnRetourModale.appendChild(iconRetourModale);
    divIconModaleAjout.appendChild(btnRetourModale);
    btnCloseModale.appendChild(iconCloseModale);
    divIconModaleAjout.appendChild(btnCloseModale);
    modaleContainerAjout.appendChild(divIconModaleAjout)
    modaleContainerAjout.appendChild(ajoutModaleH3);
    modaleContainerAjout.appendChild(ajoutModaleForm);
    divAjoutFichier.appendChild(divAjoutFichierImg)
    divAjoutFichier.appendChild(ajoutModaleInputAjoutImg)
    ajoutModaleForm.appendChild(divAjoutFichier)
    ajoutModaleForm.appendChild(ajoutModaleLabelTitre);
    ajoutModaleForm.appendChild(ajoutModaleInputTitre);
    ajoutModaleForm.appendChild(ajoutModaleLabelCatégorie);
    ajoutModaleForm.appendChild(ajoutModaleInputCatégorie);
    ajoutModaleForm.appendChild(ligneSeparation)
    ajoutModaleForm.appendChild(ajoutModaleSubmitValider);
    overlay.appendChild(modaleContainerAjout);
    bodyModale.appendChild(overlay);

    btnCloseModale.addEventListener("click",function () {
        modaleContainerAjout.remove()
        overlay.remove()
    })

    btnRetourModale.addEventListener("click" , function(){
        modaleContainerAjout.remove()
        overlay.remove()
        modale()
    })
}


// Gestion du mode editon apres connexion
if (token) {
    editModeHEader();
    editModePorfolio();
    // Ouverture Modale
    const btnOpenModale = document.querySelector("#portfolio h2");
    btnOpenModale.addEventListener("click", function (){
        modale();
    });
}else{
    // Pas de mode edition si token pas présent
        genererButton(categories); 
        genererWorks(works);
}