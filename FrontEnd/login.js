const header = document.createElement("header") // Creation du header
const main = document.createElement("main") // Creation du main
const footer = document.createElement("footer") // Creation du footer

const h1 = document.createElement("h1") //Creation du h1
h1.innerText = "Sophie Bluel"
const spanH1 = document.createElement("span")
spanH1.innerText = "Architecte d'intérieur"
h1.appendChild(spanH1) // Ajout du span au h1

const nav = document.createElement("nav") // Creation du nav + ul + li
const ulNav = document.createElement("ul")
const link = ["projet", "contact","login"]
const linkA = ["index.html#portfolio","index.html#contact","login.html"]

const iconIstagram = document.createElement("img") // Integration logo insta
iconIstagram.src = "assets/icons/instagram.png"
iconIstagram.alt = "logo-Instagram"
const liInstagram = document.createElement("li") // Ajout du logo dans les li
const aInstagram = document.createElement("a")
aInstagram.href = "https://www.instagram.com/"

link.forEach(function (linkText, indexA) { // Creation des li via items
    const li = document.createElement("li")
    const a = document.createElement ("a")
    a.textContent = linkText 
    a.href = linkA[indexA] // liaison des link aux linkA
    li.appendChild(a)
    ulNav.appendChild(li)
})

aInstagram.appendChild(iconIstagram) // lien entre a href et iconIstagram
liInstagram.appendChild(aInstagram) // Ajout du logo dans les li
ulNav.appendChild(liInstagram) // Ajout du logo dans ul
nav.appendChild(ulNav)
header.appendChild(h1)
header.appendChild(nav)

// Appel semantique principale du body
document.body.appendChild(header);
document.body.appendChild(main);
document.body.appendChild(footer);
