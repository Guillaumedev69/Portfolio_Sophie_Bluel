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
    };
    sectionGallery.appendChild(divGallery);
}
const swaggerCategories = await fetch("http://localhost:5678/api/categories");
const categories = await swaggerCategories.json();
function genererButtonFiltre(categories) {
    const sectionFiltresGalerie = document.querySelector("#portfolio");
    const divFiltresGalerie = document.createElement("div");
    divFiltresGalerie.className = "btn-filtres";
    
    sectionFiltresGalerie.appendChild(divFiltresGalerie);

    // Créer et configurer le bouton "Tous"
    const btnFiltreTous = document.createElement("input");
    btnFiltreTous.type = "radio";
    btnFiltreTous.id = "filtres-tous";
    btnFiltreTous.name = "category";
    btnFiltreTous.value = "tous";
    btnFiltreTous.checked = true; // Bouton cliqué par défaut
    const labelFiltreTous = document.createElement("label");
    labelFiltreTous.htmlFor = "filtres-tous";
    labelFiltreTous.innerText = "Tous";
    divFiltresGalerie.appendChild(btnFiltreTous);
    divFiltresGalerie.appendChild(labelFiltreTous);

    // Ajouter un gestionnaire d'événements pour le bouton "Tous"
    btnFiltreTous.addEventListener("click", function () {
        document.querySelector(".gallery").innerHTML = "";
        genererWorks(works);
    });

    // Créer et configurer les autres boutons basés sur les catégories
    for (let i = 0; i < categories.length; i++) {
        const categorie = categories[i];
        const btnFiltreCategorie = document.createElement("input");
        btnFiltreCategorie.type = "radio";
        btnFiltreCategorie.id = `filtres-${categorie.id}`;
        btnFiltreCategorie.name = "category";
        btnFiltreCategorie.value = categorie.id.toString();
        const labelFiltreCategorie = document.createElement("label");
        labelFiltreCategorie.htmlFor = `filtres-${categorie.id}`;
        labelFiltreCategorie.innerText = categorie.name;
        divFiltresGalerie.appendChild(btnFiltreCategorie);
        divFiltresGalerie.appendChild(labelFiltreCategorie);

        // Ajouter un gestionnaire d'événements pour chaque bouton de catégorie
        btnFiltreCategorie.addEventListener("click", function () {
            const worksFiltres = works.filter(function (work) {
                return work.categoryId === parseInt(btnFiltreCategorie.value);
            });
            document.querySelector(".gallery").innerHTML = "";
            genererWorks(worksFiltres);
        });
    }
}
// fonction appelée apres categories pour avoir les filtres au-dessus
genererWorks(works);
const token = localStorage.getItem("token");
function headerModeEdition() {
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
function portfolioModeEdition() {
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
function modaleGestionGalerie() {
    // Placement sur le body
    const bodyModaleGalerie = document.querySelector("body"); 
    // Creation de l'arriere plan de la modale
    const overlay = document.createElement("div"); 
    overlay.className ="overlay";
    // Creation du container de la modale
    const modaleGalerieContainer = document.createElement("div"); 
    modaleGalerieContainer.className = "modale1Contain";
    // Mise en place du Header de la Modale
    const headerModaleGalerie = document.createElement("div");
    headerModaleGalerie.className = "modaleHeader";
    const btnCloseModale = document.createElement("button");
    btnCloseModale.className = "modaleClose";
    const iconCloseModale = document.createElement("img");
    iconCloseModale.src = "assets/icons/iconCLoseBlack.png";
    // H3 pour la modale d'accueil
    const h3ModaleGalerie = document.createElement("h3");
    h3ModaleGalerie.innerText = "Galerie photo";
    // Creation galerie
    const divModaleGalerie = document.createElement("div");
    divModaleGalerie.className = "modaleGalerie";
    //ligne de separation
    const ligneSeparation = document.createElement("div");
    ligneSeparation.className = "ligneSepaModale";
    // Creation du btn ajout photo
    const btnAjouterWorks = document.createElement("button");
    btnAjouterWorks.className = "modaleBtnAjout";
    btnAjouterWorks.textContent = "Ajouter une photo";
    // Mise en lien des differents éléments de la modale
    btnCloseModale.appendChild(iconCloseModale);
    headerModaleGalerie.appendChild(btnCloseModale);
    modaleGalerieContainer.appendChild(headerModaleGalerie)
    modaleGalerieContainer.appendChild(h3ModaleGalerie);
    modaleGalerieContainer.appendChild(divModaleGalerie);
    modaleGalerieContainer.appendChild(ligneSeparation);
    modaleGalerieContainer.appendChild(btnAjouterWorks);
    overlay.appendChild(modaleGalerieContainer);
    bodyModaleGalerie.appendChild(overlay);
    // Fermer modale si click à l'exterieur de celle-ci 
    function fermerModale(event) {
        const modale = document.querySelector(".modale1Contain");
        const overlay = document.querySelector(".overlay");
        
        // Vérifier si modale est null avant d'utiliser la methode
        // methode pour eviter un defaut dans la console
        //"Uncaught TypeError: Cannot read properties of null (reading 'contains')".
        if (modale && (event.target === overlay || (!modale.contains(event.target) && event.target !== modale))) {
            modaleGalerieContainer.remove();
            overlay.remove();
        }
    }
    overlay.addEventListener("click", fermerModale)
    // Fermer la modale grâce au btn
    btnCloseModale.addEventListener("click",function () {
        modaleGalerieContainer.remove();
        overlay.remove();
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
                imageElement.className = "imgGalerie";
            const iconSupp = document.createElement("img");
            iconSupp.src = "assets/icons/iconTrash.png";
            iconSupp.className = "iconTrash";
            const backgrdnIconTrash = document.createElement("img");
            backgrdnIconTrash.src = "assets/icons/iconBackgrnd.png";
            backgrdnIconTrash.className = "iconBackgrndTrash";
            const btnTrash = document.createElement("button");
            btnTrash.className = "btnTrash";
            btnTrash.appendChild(backgrdnIconTrash);
            btnTrash.appendChild(iconSupp);
            worksElement.appendChild(btnTrash);
            worksElement.appendChild(imageElement);
            sectionGalerieModale.appendChild(worksElement);  
            // Mise en service du btn Trash avec suppression dans l'API
            btnTrash.addEventListener("click", function (event) {                         
                const Id = figureGalerie.id;
                event.preventDefault()
                worksElement.remove(event);
                const deleteWorks = fetch(`http://localhost:5678/api/works/${Id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },      
                });
                if (deleteWorks.ok) {
                    // Supprimer l'élément de la galerie modale
                    console.log("Works surpimés")
                    
                    
                }
            });
            
        }       
    }
    genererWorksModale(works);
    //ouverture mode ajout de fichier
    btnAjouterWorks.addEventListener("click", function () {
        modaleGalerieContainer.remove();
        overlay.remove();
        modaleAjouterWorks();    
    });
};
function modaleAjouterWorks() {
    const bodyModaleAjouterWorks = document.querySelector("body"); 
    // Creation de l'arriere plan de la modale
    const overlay = document.createElement("div"); 
    overlay.className ="overlay";
    // Creation du container de la modale
    const containerAjouterWorks = document.createElement("div"); 
    containerAjouterWorks.className = "modaleAjoutContain";
    // Creation div pour les icons
    const headerAjouterWorks = document.createElement("div");
    headerAjouterWorks.className = "divIconRetourClose";
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
    const h3AjouterWorks = document.createElement("h3");
    h3AjouterWorks.innerText = "Ajout photo";
    // Creation du form d'ajout de works
    const formAjouterWorks = document.createElement("form");
    formAjouterWorks.id = "formAjoutFichier";
    formAjouterWorks.method = "POST";
    // Creation de la div pour l'ajout de l'image
    const divAjouterFichier = document.createElement("div");
    divAjouterFichier.className = "divAjoutFichier";
    // Icon pour l'ajout d'image
    const imgAjouterFichier = document.createElement("img");
    imgAjouterFichier.src = "assets/icons/iconAjoutFichierImg.png";
    // Bouton pour télécharger l'image
    const labelAjouterFichier = document.createElement("label");
    labelAjouterFichier.setAttribute("for", "ajoutFichierInput");
    labelAjouterFichier.textContent = "+ Ajouter photo";
    labelAjouterFichier.className = "ajoutFichierLabel";
    const inputAjouterFichier = document.createElement("input");
    inputAjouterFichier.id = "ajoutFichierInput";
    inputAjouterFichier.setAttribute("type", "file");
    // Limiter les types de fichiers acceptés (jpeg, png)
    inputAjouterFichier.setAttribute("accept", ".jpg,.jpeg,.png");
    // Limiter la taille maximale du fichier à 4 Mo (avec calcul car la valeur est en octets)
    inputAjouterFichier.setAttribute("maxFileSize", 4 * 1024 * 1024);
    // p avec les specification d'image autorisées
    const pAjouterFichier = document.createElement("p");
    pAjouterFichier.textContent = "jpg, png : 4mo max";
    const maxTailleFichier = 4 * 1024 * 1024;
    // Creation des deux zones saisie pour le titre de l'image et la catégorie
    const divInfoFichier = document.createElement("div");
    divInfoFichier.className = "divAjoutFichierInfos";
    const labelTitreInfoFichier = document.createElement("label");
    labelTitreInfoFichier.textContent = "Titre";
    const inputTitreInfoFichier = document.createElement("input");
    inputTitreInfoFichier.setAttribute("type","texte");
    const labelCatégorieInfoFichier = document.createElement("label");
    // Creation selection d'une categorie
    labelCatégorieInfoFichier.textContent = "Catégorie";
    const selectCatégorieInfoFichier = document.createElement("select");
    // Creation boucle pour options
    for (let i = 0; i < categories.length; i++) {
        // Recuperation de la liste des catégories
        const category = categories[i];
        // Creation des options
        const categoriesName = document.createElement("option");
        // Ajout des valeur en lien avec la data
        categoriesName.value = category.id;
        categoriesName.text = category.name;
        // Ajout des options au select en recuperer les categories de l'API
        selectCatégorieInfoFichier.appendChild(categoriesName);
    }
    // Creation de la ligne de separation
    const ligneSeparation = document.createElement("div");
    ligneSeparation.className = "ligneSepaModale2";
    // bouton pour envoyer le Form
    const btnValiderFormAjouterFichier = document.createElement("button");
    btnValiderFormAjouterFichier.setAttribute("type","submit");
    btnValiderFormAjouterFichier.textContent = "Valider";
    // appel des elements
    btnRetourModale.appendChild(iconRetourModale);
    headerAjouterWorks.appendChild(btnRetourModale);
    btnCloseModale.appendChild(iconCloseModale);
    headerAjouterWorks.appendChild(btnCloseModale);
    containerAjouterWorks.appendChild(headerAjouterWorks);
    containerAjouterWorks.appendChild(h3AjouterWorks);
    containerAjouterWorks.appendChild(formAjouterWorks);
    divAjouterFichier.appendChild(imgAjouterFichier);
    divAjouterFichier.appendChild(labelAjouterFichier);
    divAjouterFichier.appendChild(inputAjouterFichier);
    divAjouterFichier.appendChild(pAjouterFichier);
    formAjouterWorks.appendChild(divAjouterFichier);
    formAjouterWorks.appendChild(divInfoFichier);
    // div pour les infos du nouveau fichier
    divInfoFichier.appendChild(labelTitreInfoFichier);
    divInfoFichier.appendChild(inputTitreInfoFichier);
    divInfoFichier.appendChild(labelCatégorieInfoFichier);
    divInfoFichier.appendChild(selectCatégorieInfoFichier);
    // ligne de separation
    formAjouterWorks.appendChild(ligneSeparation);
    // Btn de valdiation du form
    formAjouterWorks.appendChild(btnValiderFormAjouterFichier);
    // Localisatione et arriere plan
    overlay.appendChild(containerAjouterWorks);
    bodyModaleAjouterWorks.appendChild(overlay);

    function fermerModaleAjout(event) {
        const modale = document.querySelector(".modaleAjoutContain");
        const overlay = document.querySelector(".overlay");
        
        // Vérifier si modale est null avant d'utiliser la methode
        // methode pour eviter un defaut dans la console
        //"Uncaught TypeError: Cannot read properties of null (reading 'contains')".
        if (modale && (event.target === overlay || 
            (!modale.contains(event.target) && event.target !== modale))) {
            containerAjouterWorks.remove();
            overlay.remove();
        }
    };
    overlay.addEventListener("click", fermerModaleAjout);
    // Fermer la modale
    btnCloseModale.addEventListener("click",function () {
        containerAjouterWorks.remove();
        overlay.remove();
    });
    // Revenir à la modale principale
    btnRetourModale.addEventListener("click", function(event){
        containerAjouterWorks.remove();
        overlay.remove();
        modaleGestionGalerie(event);
    })
    // Remplacement de la div ajout d'image par l'image uploader
    function intialisationAjoutImg() {
        inputAjouterFichier.addEventListener("change", function () {
            let file = inputAjouterFichier.files[0];
            const divImgAjoutee = document.querySelector(".divAjoutFichier");
            const imgAjoutee = document.createElement("img");
            imgAjoutee.id = "imgAjoutee";
            imgAjoutee.src = URL.createObjectURL(file);
            divImgAjoutee.appendChild(imgAjoutee);
            imgAjouterFichier.remove();
            labelAjouterFichier.remove();
            inputAjouterFichier.remove();
            pAjouterFichier.remove();
            // Verification du type
            const regexFormatFichier = /\.(jpg|jpeg|png)$/i;
            const nomFichier = inputAjouterFichier.value;
            if (!regexFormatFichier.test(nomFichier)) {
            alertInfoFormatFichier();
            overlay.remove();
            console.log("mauvais format");
            }
            // Verification de la taille max
            const fichier = inputAjouterFichier.files[0];
            if (fichier && fichier.size > maxTailleFichier) {
                alertInfoTailleFichier();
                overlay.remove();
                console.log("Document trop volumineux");
            }
        });
    };
    document.addEventListener("DOMContentLoaded", intialisationAjoutImg);
    inputAjouterFichier.addEventListener("change", function () {
        const file = inputAjouterFichier.files[0];
        const divImgAjoutee = document.querySelector(".divAjoutFichier");
        const imgAjoutee = document.createElement("img");
        imgAjoutee.id = "imgAjoutee";
        imgAjoutee.src = URL.createObjectURL(file);
        divImgAjoutee.appendChild(imgAjoutee);
        imgAjouterFichier.remove();
        labelAjouterFichier.remove();
        inputAjouterFichier.remove();
        pAjouterFichier.remove();
        // Verification du type
        const regexFormatFichier = /\.(jpg|jpeg|png)$/i;
        const nomFichier = inputAjouterFichier.value;
        if (!regexFormatFichier.test(nomFichier)) {
        alertInfoFormatFichier();
        overlay.remove();
        console.log("mauvais format");
        }
        // Verification de la taille max
        const fichier = inputAjouterFichier.files[0];
        if (fichier && fichier.size > maxTailleFichier) {
            alertInfoTailleFichier();
            overlay.remove();
            console.log("Document trop volumineux");
        }
    });
    // Alerte en cas de mauvais format
    function alertInfoFormatFichier() {
        const bodyAlert = document.querySelector("body");        
        const overlay = document.createElement("div");
        overlay.className ="overlay";        
        const alertContainer = document.createElement("div");
        alertContainer.className = "alertFormatFichier";        
        const alertP = document.createElement("p");
        alertP.innerText = "Le format sélectionné n'est pas le bon !";
        const btnAlertFormat = document.createElement("button");
        btnAlertFormat.textContent = "Veuillez choisir le bon format.";        
        alertContainer.appendChild(alertP);
        alertContainer.appendChild(btnAlertFormat);
        overlay.appendChild(alertContainer);
        bodyAlert.appendChild(overlay);
        // Bouton pour revenir a la modale d'ajout
        btnAlertFormat.addEventListener("click", function (event) {
            overlay.remove();
            alertContainer.remove();
             modaleAjouterWorks(event);
        });
    };
    // Alerte en cas de mauvaise taille max
    function alertInfoTailleFichier() {
        const bodyAlert = document.querySelector("body");    
        const overlay = document.createElement("div");
        overlay.className ="overlay";    
        const alertContainer = document.createElement("div");
        alertContainer.className = "alertFormatFichier";    
        const alertP = document.createElement("p");
        alertP.innerText = "Capacité maximum atteinte !";    
        const btnAlertFormat = document.createElement("button");
        btnAlertFormat.textContent = "Veuillez choisir un fichier moins volumineux";    
        alertContainer.appendChild(alertP);
        alertContainer.appendChild(btnAlertFormat);
        overlay.appendChild(alertContainer);
        bodyAlert.appendChild(overlay);
        // Bouton pour revenir a la modale d'ajout
        btnAlertFormat.addEventListener("click", function () {
            overlay.remove();
            alertContainer.remove();
            modaleAjouterWorks();
        });
    };
    // Alerte champs vide
    function alertInfoChampVideFichier() {
        const bodyAlert = document.querySelector("body");
    
        const overlay = document.createElement("div");
        overlay.className ="overlay";
    
        const alertContainer = document.createElement("div");
        alertContainer.className = "alertFormatFichier";
    
        const alertP = document.createElement("p");
        alertP.innerText = "Champs vide !";
    
        const btnNouvelEssai = document.createElement("button")
        btnNouvelEssai.textContent = "Nouvel Essai"
    
        btnNouvelEssai.addEventListener("click", function () {
            overlay.remove()
        })
    
        alertContainer.appendChild(alertP);
        alertContainer.appendChild(btnNouvelEssai);
        overlay.appendChild(alertContainer);
        bodyAlert.appendChild(overlay);
    }
    // Envoi du nouveau fichier vers l'API
    formAjouterWorks.addEventListener("submit", async function (SubmitEvent) {
        SubmitEvent.preventDefault();
        const formData = new FormData();
        const imgFichier = inputAjouterFichier.files[0];
        const titreFichier = inputTitreInfoFichier.value;
        const categorieFichier = selectCatégorieInfoFichier.value;
        formData.append("image", imgFichier);
        formData.append("title", titreFichier);
        formData.append("category", categorieFichier);
        // Gestion des champs vides avec désactivation du bouton
        if (imgFichier === undefined || titreFichier === "" || categorieFichier === "") {
            btnValiderFormAjouterFichier.disabled = true;
            alertInfoChampVideFichier();
            console.log("Champs vides");
            return;
        }
        const swaggerWorksAjout = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { "Authorization": "Bearer " + token },
            body: formData,
        });
        if (swaggerWorksAjout.ok) {
            console.log("Fichier ajouté avec succès");
        } else {
            console.log("Échec de l'ajout du fichier");
        }
    });
}  

// Gestion du mode editon apres connexion
if (token) {
    headerModeEdition();
    portfolioModeEdition();
    // Ouverture Modale
    const btnOpenModale = document.querySelector("#portfolio h2");
    btnOpenModale.addEventListener("click", function (event){
        modaleGestionGalerie(event);
    });
}else{
    // Pas de mode edition si token pas présent
        genererButtonFiltre(categories); 
        genererWorks(works);
}