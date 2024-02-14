const swaggerWorks = await fetch("http://localhost:5678/api/works");
const works = await swaggerWorks.json();

function genererWorks(works) {
    const sectionGallery = document.querySelector(".gallery");

    for (let i = 0; i < works.length; i++) {
        const figureGallery = works[i];

        const worksElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = figureGallery.imageUrl;

        const nomElement = document.createElement("figcaption");
        nomElement.innerText = figureGallery.title;

        worksElement.appendChild(imageElement);
        worksElement.appendChild(nomElement);

        sectionGallery.appendChild(worksElement);
    }
}

genererWorks(works);