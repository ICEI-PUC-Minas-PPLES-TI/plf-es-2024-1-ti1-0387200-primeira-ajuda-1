import { consultarPostagens } from "../main.js"

export function imprimirPostagens() {
    let postagens = consultarPostagens()
    const { data } = postagens

    console.log(data)

    let elementosHTMl = data.reduce(
        (postagens, item) =>
            postagens +
            `
          <article id="${item.id}" class="postagem">
            <header class="postagemHeader">
                <div>
                    <img src="${item.avatar}" alt="avatar">
                    <div>
                        <h4>${item.nome}</h4>
                        <p>
                            <span>${item.level} </span>
                            <span>| ${item.profissao} |</span>
                            <span>${item.data}</span>
                        </p>
                    </div>
                </div>
                
        
                <div>
                    <span onClick="editarPostagem(${item.id})" data-toggle="tooltip" title="Editar Postagem">
                        <i class="fa-solid fa-pen-to-square"></i>                   
                    </span>

                    <span onClick="removerPostagem(${item.id})" data-toggle="tooltip" title="Excluir Postagem">
                        <i class="fa-solid fa-trash"></i>     
                    </span> 
                </div>             
            </header>
            
            <form class="postForm">
                <textarea id="textArea${item.id}" class="textArea" disabled>${item.conteudo}</textarea>        
            </form>

            <footer class="postagemFooter">
                <span>
                    <i class="fa-regular fa-heart" data-toggle="tooltip" title="Curtir Postagem"></i>                 
                </span>

                <span>
                    <i class="fa-regular fa-comment" data-toggle="tooltip" title="Comentar Postagem"></i>    
                </span> 
            </footer>
          </article>
    `,
        ``
    )

    document.querySelector("#postagensWrapper").innerHTML = elementosHTMl
}