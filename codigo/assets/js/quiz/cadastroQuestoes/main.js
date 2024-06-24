import { QuizService } from "../../../services/quizService.js";

const usuario = JSON.parse(localStorage.getItem('usuario'))
const consultarSeletor = (variante) => document.querySelector(variante)

const form = consultarSeletor('form')
const quizService = new QuizService()

function getNextID() {
    let currentID = parseInt(localStorage.getItem('currentID')) || 0;
    currentID++;
    localStorage.setItem('currentID', currentID);
    return currentID;
}

function validaFormulario(dados) {
    const dadosRecuperados = { ...dados }
    delete dados['resposta']
    delete dados['pergunta']

    if (!Object.values(dados).includes(dadosRecuperados.resposta)) {
        alert("A resposta deve ser igual a uma das alternativas.")
        return
    }

    const { alternativa1, alternativa2, alternativa3, alternativa4 } = dadosRecuperados
    const alternativas = [alternativa1, alternativa2, alternativa3, alternativa4]

    const alternativasSet = new Set(alternativas)
    if (alternativasSet.size !== alternativas.length) {
        alert("As alternativas devem ser únicas.")
        return
    }
}

form.addEventListener('submit', async (evento) => {
    evento.preventDefault()

    if (Object.values(usuario).length === 0) {
        window.location.href = `/codigo/pages/login/login.html`
        return
    }

    const dadosCadastroQuestoes = {}
    const valoresFormulario = new FormData(evento.target)
    valoresFormulario.forEach((value, key) => dadosCadastroQuestoes[key] = value)

    validaFormulario(dadosCadastroQuestoes)

    const resposta = await quizService.createPergunta({
        id: getNextID(),
        ...dadosCadastroQuestoes
    })

    if (resposta) {
        form.reset()
        alert("A pergunta foi cadastrada com sucesso!")
    }
})


