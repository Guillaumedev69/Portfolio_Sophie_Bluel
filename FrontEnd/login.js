const header = document.createElement("header"); // Creation du header
const main = document.createElement("main"); // Creation du main
const footer = document.createElement("footer"); // Creation du footer

// Appel semantique principale du body
document.body.appendChild(header);
document.body.appendChild(main);
document.body.appendChild(footer);

// Gestion du Header
const h1 = document.createElement("h1"); //Creation du h1
h1.innerText = "Sophie Bluel";
const spanH1 = document.createElement("span");
spanH1.innerText = "Architecte d'intérieur";
h1.appendChild(spanH1); // Ajout du span au h1
const navHeader = document.createElement("nav"); // Creation du nav + ul + li
const ulNavHeader = document.createElement("ul");
const link = ["projet", "contact","login"];
const linkA = ["index.html#portfolio","index.html#contact","login.html"];
const iconIstagram = document.createElement("img"); // Integration logo insta
iconIstagram.src = "assets/icons/instagram.png";
iconIstagram.alt = "logo-Instagram";
const liInstagram = document.createElement("li"); // Ajout du logo dans les li
const aInstagram = document.createElement("a");
aInstagram.href = "https://www.instagram.com/";
link.forEach(function (linkText, indexA) { // Creation des li via items
    const li = document.createElement("li");
    const a = document.createElement ("a");
    a.textContent = linkText;
    a.href = linkA[indexA]; // liaison des link aux linkA
    li.appendChild(a);
    ulNavHeader.appendChild(li);
});
aInstagram.appendChild(iconIstagram); // lien entre a href et iconIstagram
liInstagram.appendChild(aInstagram); // Ajout du logo dans les li
ulNavHeader.appendChild(liInstagram); // Ajout du logo dans ul
navHeader.appendChild(ulNavHeader);
header.appendChild(h1);
header.appendChild(navHeader);

// Gestion du Main
const sectionLogin = document.createElement("section"); // Creation de la section #login
sectionLogin.id ="login";
const h2 = document.createElement("h2");
h2.innerText = "Log In";

// Elements Formulaire de connexion
const formLogIn = document.createElement("form");
formLogIn.id = "formLogIn";
formLogIn.method = "POST";
const labelEmail = document.createElement("label");
labelEmail.textContent = "E-mail";
const inputEmail = document.createElement("input");
inputEmail.setAttribute("type", "email");
inputEmail.setAttribute("id", "email");
const labelMdp = document.createElement("label");
labelMdp.textContent = "Mot de passe";
const inputMdp = document.createElement("input");
inputMdp.setAttribute("type", "password");
inputMdp.setAttribute("id", "password");
const inputConnexion = document.createElement("input");
inputConnexion.type = "submit";
inputConnexion.value = "Se connecter";
const aMdpOublie = document.createElement("a");
aMdpOublie.href = "#";
aMdpOublie.textContent = "Mot de passe oublié";
main.appendChild(sectionLogin);
sectionLogin.appendChild(h2);
sectionLogin.appendChild(formLogIn);

// liaision des Elements au formulaire de connexion
formLogIn.appendChild(labelEmail);
formLogIn.appendChild(inputEmail);
formLogIn.appendChild(labelMdp);
formLogIn.appendChild(inputMdp);
formLogIn.appendChild(inputConnexion);
formLogIn.appendChild(aMdpOublie);
// fonctionnement du form de login

formLogIn.addEventListener("submit", async function (SubmitEvent) {
    SubmitEvent.preventDefault();
    
    // Récupérer les valeurs des champs email et mot de passe
    const email = inputEmail.value.trim(); // .trim pour supprimer les caractères speciaux avant/apres 
    const password = inputMdp.value.trim();
    
    if (email === "" && password === "") {
        inputEmail.value = "";
        inputMdp.value = "";
        alert("Champs vide !");
        console.log("champs vide");
    } else {
        try { // Envoyer de la demande de connexion
            const swaggerLogin = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email,password}),
            });
        
            if (swaggerLogin.ok) {
        
            const swaggerToken = await swaggerLogin.json(); // Recuperation du token en JSON
            localStorage.setItem("token", swaggerToken.token); // Mise en mémoire du token
            inputEmail.value = "";
            inputMdp.value = "";
            alert("Connexion réussie !");
            console.log("Connexion réussie !");
            setTimeout(() => {
                window.location.href="index.html"; // Redirection vers la page en 3s
            }, 3000);
            console.log(swaggerToken);
        
            } else {
            inputEmail.value = "";
            inputMdp.value = "";
            alert("Erreur lors de la connexion :", swaggerLogin.status);
            console.log("Erreur lors de la connexion :", swaggerLogin.status);
            }

        } catch (error){
            alert("Error");
        }
    }
});

// Gestion du Footer
const navFooter = document.createElement("nav");
const ulFooter = document.createElement("ul");
const liFooter = document.createElement("li");
liFooter.textContent = "Mentions Légales";

// appel du footer
ulFooter.appendChild(liFooter);
navFooter.appendChild(ulFooter);
footer.appendChild(navFooter);
