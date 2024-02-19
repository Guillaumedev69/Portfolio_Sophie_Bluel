
 // modale Header
    const modaleHeader = document.querySelector("header")
    const divModaleHeader = document.createElement("div")
    divModaleHeader.className = "modaleHeader"
    const iconModaleHeader = document.createElement("img")
    iconModaleHeader.src = "assets/icons/Vector.png"
    const pModaleHeader = document.createElement("p")
    pModaleHeader.innerText = "Mode édition"
    header.appendChild(modaleHeader)
    modaleHeader.appendChild(divModaleHeader)
    divModaleHeader.appendChild(iconModaleHeader)
    divModaleHeader.appendChild(pModaleHeader)
    // modale Porfolio
    const modalePorfolio = document.querySelector("#portfolio h2")
    const divModalePorfolio = document.createElement("div")
    divModalePorfolio.className = "modalePorfolio"
    const iconModalePortfolio = document.createElement("img")
    iconModalePortfolio.src = "assets/icons/Vector.png"
    const pModalePortfolio = document.createElement("p")
    pModalePortfolio.innerText = "modifier"
    main.appendChild(modalePorfolio)
    modalePorfolio.appendChild(divModalePorfolio)
    divModalePorfolio.appendChild(iconModalePortfolio)
    divModalePorfolio.appendChild(pModalePortfolio)