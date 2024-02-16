const header = document.createElement("header") // Creation du header

const h1 = document.createElement("h1") //Creation du h1
h1.innerText = "Sophie Bluel"
const spanH1 = document.createElement("span")
spanH1.innerText = "Architecte d'intérieur"
h1.appendChild(spanH1) // Ajout du span au h1

const nav = document.createElement("nav") // Creation du nav + ul + li
const ulNav = document.createElement("ul")
const items = ["projet", "contact","login"]
const iconIstagram = document.createElement("img") // Integration logo insta
iconIstagram.src = "assets/icons/instagram.png"
iconIstagram.alt = "logo-Instagram"
const liInstagram = document.createElement("li") // Ajout du logo dans les li
items.forEach(function (itemText) {
    const li = document.createElement("li")
    const a = document.createElement ("a")
    a.textContent = itemText
    li.appendChild(a)
    ulNav.appendChild(li)
})

liInstagram.appendChild(iconIstagram) // Ajout du logo dans les li
ulNav.appendChild(liInstagram) // Ajout du logo dans ul
nav.appendChild(ulNav)
header.appendChild(h1)
header.appendChild(nav)

document.body.insertBefore(header, document.body.firstChild)