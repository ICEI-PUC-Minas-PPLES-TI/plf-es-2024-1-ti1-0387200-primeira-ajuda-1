import { consultarPostagens } from "../main.js"

export function imprimirPostagens() {
    let postagens = consultarPostagens()
    const { data } = postagens

    let elementosHTMl = data.reduce(
        (postagens, item) =>
            postagens +
            `
          <article id="${item.id} class="postagem">
            <header>
                <div>
                    <img>
                    <div>
                        <h3>${item.nome}</h3>
                        <p>
                            <span>${item.level} |</span>
                            <span>${item.profissao} |</span>
                            <span>${item.data}</span>
                        </p>
                    </div>
                </div>
                
        
                <div>
                    <span onClick="editarPostagem(${item.id})">
                        <i class="fa-solid fa-pen-to-square"></i>                   
                    </span >

                    <span onClick="removerPostagem(${item.id})">
                        <i class="fa-solid fa-trash"></i>     
                    </span > 
                </div>             
            </header>
            
            <form>
                <textarea id="textArea${item.id}" disabled>${item.conteudo}</textarea>        
            </form>
          </article >
    `,
        ``
    )

    document.querySelector("#postagensWrapper").innerHTML = elementosHTMl
}