const swaggerWorks = await fetch("http://localhost:5678/api/works")
const works = await swaggerWorks.json()

function genererWorks(works) {
    const sectionGallery = document.querySelector("#portfolio")
    const divGallery = document.createElement("div")
    divGallery.className = "gallery"

    for (let i = 0; i < works.length; i++) {
        const figureGallery = works[i]
        const worksElement = document.createElement("figure")
        const imageElement = document.createElement("img")
            imageElement.src = figureGallery.imageUrl
        const nomElement = document.createElement("figcaption")
            nomElement.innerText = figureGallery.title
        worksElement.appendChild(imageElement)
        worksElement.appendChild(nomElement)
        sectionGallery.appendChild(divGallery)
        divGallery.appendChild(worksElement)
    }
}

const swaggerCategories = await fetch("http://localhost:5678/api/categories")
const categories = await swaggerCategories.json()

function genererButton(categories) {
    const sectionFiltres = document.querySelector("#portfolio")
    const divFiltres = document.createElement("div")
    divFiltres.className = "btn-filtres"

    const buttonTous = document.createElement("button")
    const nomButtonTous = document.createElement("h3")
    nomButtonTous.innerText = "Tous"
    
    sectionFiltres.appendChild(divFiltres)
    divFiltres.appendChild(buttonTous)
    buttonTous.appendChild(nomButtonTous)
    

    for (let i = 0; i < categories.length; i++) {
        const filtresGallery = categories[i]
        const filtresElement = document.createElement("button")
        const nomElement = document.createElement("h3")
        nomElement.innerText = filtresGallery.name
        divFiltres.appendChild(filtresElement)
        filtresElement.appendChild(nomElement)
    }
}

genererButton(categories) 
// fonction appelée apres categories pour avoir les filtres au-dessus
genererWorks(works) 


