import { QuizService } from "../../../services/quizService.js";

const usuario = JSON.parse(localStorage.getItem('usuario')) || {}
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
    const { alternativa1, alternativa2, alternativa3, alternativa4 } = dados
    const alternativas = [alternativa1, alternativa2, alternativa3, alternativa4]

    if (!alternativas.includes(dados.resposta)) {
        alert("A resposta deve ser igual a uma das alternativas.")
        return false
    }

    const alternativasSet = new Set(alternativas)
    if (alternativasSet.size !== alternativas.length) {
        alert("As alternativas devem ser únicas.")
        return false
    }

    return true
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

    if (validaFormulario(dadosCadastroQuestoes)) {
        const resposta = await quizService.createPergunta({
            id: getNextID(),
            ...dadosCadastroQuestoes
        })

        if (resposta) {
            form.reset()
            alert("A pergunta foi cadastrada com sucesso!")
        }
    }
})


