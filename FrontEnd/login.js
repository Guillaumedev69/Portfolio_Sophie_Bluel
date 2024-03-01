//// Creation : Header/Main/Footer
const header = document.createElement("header");
const main = document.createElement("main");
const footer = document.createElement("footer");
// Appel semantique principale du body
document.body.appendChild(header);
document.body.appendChild(main);
document.body.appendChild(footer);
//// Gestion du Header
const h1Header = document.createElement("h1");//Creation du h1
h1Header.innerText = "Sophie Bluel";
const spanH1Header = document.createElement("span");// Creation et ajout du span au h1
spanH1Header.innerText = "Architecte d'intérieur";
h1Header.appendChild(spanH1Header);
// Creation: nav/ul/li(Instagram avec logo)
const navHeader = document.createElement("nav");
const ulNavHeader = document.createElement("ul");
const lienNavHeader = ["projets", "contact","login"];
const aLienNav = ["index.html#portfolio","index.html#contact","login.html"];
const liInstagram = document.createElement("li");
const aInstagram = document.createElement("a");
aInstagram.href = "https://www.instagram.com/";
const iconIstagram = document.createElement("img");
iconIstagram.src = "assets/icons/instagram.png";
iconIstagram.alt = "logo-Instagram";
//Creation: li par rapport au tableau lienNavHeader avec element (a)
lienNavHeader.forEach(function (linkText, indexA) {
    const liNavHeader = document.createElement("li");
    const a = document.createElement ("a");
    a.textContent = linkText;
    a.href = aLienNav[indexA];
    liNavHeader.appendChild(a);
    ulNavHeader.appendChild(liNavHeader);
});
// Liaison entre le li/icon/a (Instagram)
aInstagram.appendChild(iconIstagram);
liInstagram.appendChild(aInstagram);
ulNavHeader.appendChild(liInstagram);
// Nav ajoute la liste ul
navHeader.appendChild(ulNavHeader);
// Header ajoute le h1 et le Nav
header.appendChild(h1Header);
header.appendChild(navHeader);
//// Gestion du Main
// Creation de la section #login
const sectionLogin = document.createElement("section");
sectionLogin.id ="login";
const h2 = document.createElement("h2");
h2.innerText = "Log In";
// Elements Formulaire de connexion
const formLogin = document.createElement("form");
formLogin.id = "formLogIn";
formLogin.method = "POST";
const labelEmailFormLogin = document.createElement("label");
labelEmailFormLogin.textContent = "E-mail";
// Attribution du type "email" pour accepter uniquement des format email
const inputEmailFormLogin = document.createElement("input");
inputEmailFormLogin.setAttribute("type", "email");
inputEmailFormLogin.setAttribute("id", "email");
const labelMdpFormLogin = document.createElement("label");
labelMdpFormLogin.textContent = "Mot de passe";
// Attribution du type "password" pour que les caracteres soient masqués
const inputMdpFormLogin = document.createElement("input");
inputMdpFormLogin.setAttribute("type", "password");
inputMdpFormLogin.setAttribute("id", "password");
const inputConnexionFormLogin = document.createElement("input");
inputConnexionFormLogin.type = "submit";
inputConnexionFormLogin.value = "Se connecter";
const aMdpOublieFormLogin = document.createElement("a");
aMdpOublieFormLogin.href = "#";
aMdpOublieFormLogin.textContent = "Mot de passe oublié";
main.appendChild(sectionLogin);
sectionLogin.appendChild(h2);
sectionLogin.appendChild(formLogin);
// liaision des Elements au form de connexion
formLogin.appendChild(labelEmailFormLogin);
formLogin.appendChild(inputEmailFormLogin);
formLogin.appendChild(labelMdpFormLogin);
formLogin.appendChild(inputMdpFormLogin);
formLogin.appendChild(inputConnexionFormLogin);
formLogin.appendChild(aMdpOublieFormLogin);
//// fonction pour gestion du form de login
function alertInfoValideFormLogin() {
    const bodyAlert = document.querySelector("body");
    const overlay = document.createElement("div");
    overlay.className ="overlay";
    const alertContainer = document.createElement("div");
    alertContainer.className = "alertLogin";
    const alertP = document.createElement("p");
    alertP.className = "alertLoginMsgValide";
    alertP.innerText = "Connexion Réussie !";
    alertContainer.appendChild(alertP)
    overlay.appendChild(alertContainer);
    bodyAlert.appendChild(overlay);
}
function alertInfoChampsVideFormLogin() {
    const bodyAlert = document.querySelector("body");
    const overlay = document.createElement("div");
    overlay.className ="overlay";
    const alertContainer = document.createElement("div");
    alertContainer.className = "alertLogin";
    const alertP = document.createElement("p");
    alertP.className = "alertLoginMsg";
    alertP.innerText = "Champs vide !";
    const btnNouvelEssai = document.createElement("button")
    btnNouvelEssai.className = "btn-alert"
    btnNouvelEssai.textContent = "Nouvel Essai"
    btnNouvelEssai.addEventListener("click", function () {
        overlay.remove()
    })
    alertContainer.appendChild(alertP);
    alertContainer.appendChild(btnNouvelEssai);
    overlay.appendChild(alertContainer);
    bodyAlert.appendChild(overlay);
}
function alertLoginMdpIncorrectFormLogin() {
    const bodyAlert = document.querySelector("body");
    const overlay = document.createElement("div");
    overlay.className ="overlay";
    const alertContainer = document.createElement("div");
    alertContainer.className = "alertLogin";
    const pAlert = document.createElement("p");
    pAlert.className = "alertLoginMsg";
    pAlert.innerText = "E-mail et/ou Mot de passe incorrect !";
    const btnNouvelEssaiAlerte = document.createElement("button");
    btnNouvelEssaiAlerte.className = "btn-alert";
    btnNouvelEssaiAlerte.textContent = "Nouvel Essai";
    btnNouvelEssaiAlerte.addEventListener("click", function () {
        overlay.remove();
    })
    alertContainer.appendChild(pAlert);
    alertContainer.appendChild(btnNouvelEssaiAlerte);
    overlay.appendChild(alertContainer);
    bodyAlert.appendChild(overlay);
}
function alertErrorFormLogin() {
    const bodyAlert = document.querySelector("body");
    const overlay = document.createElement("div");
    overlay.className ="overlay";
    const alertContainer = document.createElement("div");
    alertContainer.className = "alertLogin";
    const alertP = document.createElement("p");
    alertP.className = "alertLoginMsg";
    alertP.innerText = "Error - 404";
    const btnNouvelEssai = document.createElement("button");
    btnNouvelEssai.className = "btn-alert";
    btnNouvelEssai.textContent = "Nouvel Essai";
    btnNouvelEssai.addEventListener("click", function () {
        overlay.remove()
    })
    alertContainer.appendChild(alertP);
    alertContainer.appendChild(btnNouvelEssai);
    overlay.appendChild(alertContainer);
    bodyAlert.appendChild(overlay);
}
formLogin.addEventListener("submit", async function (SubmitEvent) {
    SubmitEvent.preventDefault();
    // Récupérer les valeurs des champs email et mot de passe
    const email = inputEmailFormLogin.value.trim(); // .trim pour supprimer les caractères speciaux avant/apres 
    const password = inputMdpFormLogin.value.trim();
    try { 
        if (email === "" || password === "") {
            alertInfoChampsVideFormLogin();
            console.log("Champs vide");
            return;
        }
        const swaggerLogin = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email,password}),
        });
        if (swaggerLogin.ok) { 
            const swaggerToken = await swaggerLogin.json(); // Recuperation du token en JSON
            localStorage.setItem("token", swaggerToken.token); // Mise en mémoire du token
            inputEmailFormLogin.value = "";
            inputMdpFormLogin.value = "";
            alertInfoValideFormLogin();
            console.log("Connexion réussie !");
            setTimeout(() => {
                window.location.href="index.html"; // Redirection vers la page en 1s
            }, 1000);
        } else {
            inputEmailFormLogin.value = "";
            inputMdpFormLogin.value = "";
            alertLoginMdpIncorrectFormLogin();
            console.log("E-mail et/ou Mot de passe incorrect");
        }
    } catch (error){
        alertErrorFormLogin();
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