import {
    USUARIO,
    REMOVE_POSTAGEM,
    CONTEUDO_INLINE_ALERT,
    confirmaAcao,
    formataData,
} from "./utils.js"

// localStorage.clear()

const section = document.querySelector("#forum")
const mainForm = document.querySelector("#mainForm")
const mainTextArea = document.querySelector("#mainTextArea")
const postagensWrapper = document.querySelector("#postagensWrapper")

function determinaId() {
    let id = parseInt(localStorage.getItem("id"));
    id++;
    localStorage.setItem("id", id);
    return id;
}

function salvaPostagens(dados) {
    localStorage.setItem("postagens", JSON.stringify(dados));
}

function consultaPostagens() {
    return JSON.parse(localStorage.getItem("postagens")) || { data: [] };
}

function criaPostagem() {
    let inlineAlert = document.querySelector(".inline-alert");

    if (mainTextArea.value) {
        if (inlineAlert) inlineAlert.remove();

        let postagens = consultaPostagens();
        postagens.data.push({
            id: determinaId(),
            ...USUARIO,
            conteudo: mainTextArea.value.trim(),
        });

        mainForm.reset();
        salvaPostagens(postagens);
        imprimePostagens();
    } else {
        if (!inlineAlert) exibirInlineAlert();
    }
}

function exibirInlineAlert() {
    let div = document.createElement("div");
    div.setAttribute("class", "inline-alert");

    let conteudo = document.createTextNode(CONTEUDO_INLINE_ALERT);
    div.appendChild(conteudo);

    section.insertBefore(div, postagensWrapper);
}

function imprimePostagens() {
    let postagens = consultaPostagens();
    const { data } = postagens;

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

                    <span onClick="removePostagem(${item.id})">
                        <i class="fa-solid fa-trash"></i>     
                    </span > 
                </div>             
            </header>
            
            <form>
                <textarea id="textArea${item.id}" disabled>${item.conteudo}</textarea>        
            </form>
          </article >
    `,
        ''
    );

    document.querySelector("#postagensWrapper").innerHTML = elementosHTMl;
}

document.querySelector("#btnPublicar").addEventListener("click", (evento) => {
    evento.preventDefault();
    criaPostagem();
});

window.removePostagem = (id) => {
    let postagens = consultaPostagens();

    if (confirmaAcao(REMOVE_POSTAGEM)) {
        salvaPostagens({
            data: postagens.data.filter((postagem) => postagem.id !== id),
        });
        imprimePostagens();
    }
};

function criarBotoes() {
    let editarBtn = document.createElement("button");
    let cancelarBtn = document.createElement("button");

    cancelarBtn.setAttribute("type", "button");
    cancelarBtn.setAttribute("id", "cancelarBtn");
    cancelarBtn.appendChild(document.createTextNode("Cancelar"));

    editarBtn.setAttribute("type", "submit");
    editarBtn.setAttribute("id", "editarBtn");
    editarBtn.appendChild(document.createTextNode("Salvar Alterações"));

    return { editarBtn, cancelarBtn };
}

function criarGrupoDeBotoes(id, editarBtn, cancelarBtn) {
    let div = document.createElement("div");
    div.setAttribute("id", `grupoDeBotoes${id}`);

    div.appendChild(cancelarBtn);
    div.appendChild(editarBtn);
    return div;
}

function atualizarPostagens(id, conteudo) {
    let postagens = consultaPostagens()
    const { data } = postagens

    let postagensAtualizadas = data.reduce(
        (postagens, item) =>
            item.id === id
                ? [
                    ...postagens,
                    {
                        ...item,
                        conteudo,
                        data: formataData(new Date()),
                    },
                ]
                : [...postagens, item],
        []
    )

    return postagensAtualizadas
}

window.editarPostagem = (id) => {
    let postagemTextArea = document.querySelector(`#textArea${id}`)
    postagemTextArea.disabled = false



    let { editarBtn, cancelarBtn } = criarBotoes()
    cancelarBtn.addEventListener("click", imprimePostagens)


    // tentativa de desabilitar o botão
    //let postagemValorInicial = postagemTextArea.value
    // console.log('primeira checagem', postagemTextArea.value)
    // console.log('segunda checagem', postagemTextArea.value)
    // if (postagemValorInicial === postagemTextArea.value || !postagemTextArea.value) {
    //     editarBtn.disabled = true
    // }

    editarBtn.addEventListener("click", (e) => {
        e.preventDefault()

        if (postagemTextArea.value) {
            salvaPostagens({ data: atualizarPostagens(id, postagemTextArea.value.trim()) })
            imprimePostagens()
        }
    })

    let grupoDeBotoes = document.querySelector(`#grupoDeBotoes${id}`)
    if (!grupoDeBotoes) postagemTextArea.parentElement.appendChild(criarGrupoDeBotoes(id, editarBtn, cancelarBtn))
}

window.addEventListener("load", () => {
    localStorage.setItem("id", 0);
    imprimePostagens();
})
