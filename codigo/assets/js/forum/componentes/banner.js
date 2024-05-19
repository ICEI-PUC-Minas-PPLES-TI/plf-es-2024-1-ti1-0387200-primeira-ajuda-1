const CONTEUDO_BANNER = {
    h2: "Vamos Começar?",
    p: "Parece que não temos nenhuma informação por aqui...Que tal criar uma nova publicação?"
}

const IMG_ATRIBUTOS = {
    src: "../assets/img/forum.svg",
    alt: "postagensEmpty"
}

export function exibirBanner(section) {
    let article = document.createElement("article")
    article.setAttribute("class", "postagensEmpty")

    let div = document.createElement("div")

    let h2 = document.createElement("h2")
    h2.appendChild(document.createTextNode(CONTEUDO_BANNER.h2))

    let p = document.createElement("p")
    p.appendChild(document.createTextNode(CONTEUDO_BANNER.p))

    div.appendChild(h2)
    div.appendChild(p)

    let img = document.createElement("img")
    Object.keys(IMG_ATRIBUTOS).forEach((key) => img.setAttribute(key, IMG_ATRIBUTOS[key]))

    article.appendChild(div)
    article.appendChild(img)
    section.appendChild(article)
}