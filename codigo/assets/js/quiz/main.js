import { QuizService } from "../../services/quizService.js";

let perguntas = []
const quizService = new QuizService()

const consultarSeletor = (variante) => document.querySelector(variante)
const btnQuiz = consultarSeletor('#btn-quiz')
const btnSubmit = consultarSeletor('#btn-submit')

const questionCountInput = ('#contadorQuestoes')
const quizButtons = consultarSeletor('.quiz-buttons')
const quizContainer = consultarSeletor('#quiz-container')
const setupContainer = consultarSeletor('#setup-container')
const contadorQuestoes = consultarSeletor('#contadorQuestoes')

function getNovoID() {
    const perguntas = JSON.parse(localStorage.getItem('CadastroPerguntas')) || [];
    return perguntas.length > 0 ? Math.max(...perguntas.map(p => p.id)) + 1 : 1;
}

const obeterNovasPerguntas = () => [
    {
        id: getNovoID(),
        pergunta: "Qual é a primeira coisa a fazer ao chegar em uma cena de acidente?",
        alternativa1: "Chamar ajuda profissional",
        alternativa2: "Checar a segurança do local",
        alternativa3: "Mover a vítima",
        alternativa4: "Iniciar a RCP",
        resposta: "Checar a segurança do local"
    },
    {
        id: getNovoID(),
        pergunta: "Qual é o número de emergência do SAMU no Brasil?",
        alternativa1: "192",
        alternativa2: "190",
        alternativa3: "193",
        alternativa4: "194",
        resposta: "192"
    },
    {
        id: getNovoID(),
        pergunta: "Qual é a sequência correta da RCP em adultos?",
        alternativa1: "Compressões, respirações, desfibrilação",
        alternativa2: "Respirações, compressões, desfibrilação",
        alternativa3: "Compressões, desfibrilação, respirações",
        alternativa4: "Desfibrilação, compressões, respirações",
        resposta: "Compressões, respirações, desfibrilação"
    },
    {
        id: getNovoID(),
        pergunta: "O que deve ser feito em caso de queimadura de primeiro grau?",
        alternativa1: "Aplicar gelo diretamente",
        alternativa2: "Cobrir com pano sujo",
        alternativa3: "Resfriar com água corrente",
        alternativa4: "Perfurar as bolhas",
        resposta: "Resfriar com água corrente"
    },
    {
        id: getNovoID(),
        pergunta: "Como identificar uma fratura exposta?",
        alternativa1: "Dor intensa e inchaço",
        alternativa2: "Osso visível através da pele",
        alternativa3: "Movimento anormal no local da fratura",
        alternativa4: "Aparência pálida da pele",
        resposta: "Osso visível através da pele"
    },
    {
        id: getNovoID(),
        pergunta: "O que é importante evitar ao socorrer uma vítima de choque elétrico?",
        alternativa1: "Usar um isolante para afastar a fonte de energia",
        alternativa2: "Tocar a vítima enquanto ainda está em contato com a fonte de energia",
        alternativa3: "Chamar a emergência imediatamente",
        alternativa4: "Verificar a respiração da vítima",
        resposta: "Tocar a vítima enquanto ainda está em contato com a fonte de energia"
    },
    {
        id: getNovoID(),
        pergunta: "Qual é o principal sintoma de uma concussão?",
        alternativa1: "Dor de estômago",
        alternativa2: "Dor de cabeça",
        alternativa3: "Dificuldade para respirar",
        alternativa4: "Náusea e vômito",
        resposta: "Dor de cabeça"
    },
    {
        id: getNovoID(),
        pergunta: "O que fazer ao encontrar alguém engasgado que não pode falar?",
        alternativa1: "Iniciar a manobra de Heimlich",
        alternativa2: "Oferecer água",
        alternativa3: "Pedir para tossir",
        alternativa4: "Deitar a pessoa de lado",
        resposta: "Iniciar a manobra de Heimlich"
    },
    {
        id: getNovoID(),
        pergunta: "Como tratar uma entorse leve no tornozelo?",
        alternativa1: "Aplicar calor",
        alternativa2: "Aplicar gelo",
        alternativa3: "Imobilizar e manter elevado",
        alternativa4: "Continuar caminhando normalmente",
        resposta: "Aplicar gelo"
    },
    {
        id: getNovoID(),
        pergunta: "Qual é o primeiro passo ao realizar a RCP?",
        alternativa1: "Verificar a resposta da vítima",
        alternativa2: "Ligar para os serviços de emergência",
        alternativa3: "Iniciar compressões torácicas",
        alternativa4: "Realizar respirações boca-a-boca",
        resposta: "Verificar a resposta da vítima"
    },
    {
        id: getNovoID(),
        pergunta: "O que é uma hemorragia interna?",
        alternativa1: "Perda de sangue visível fora do corpo",
        alternativa2: "Acúmulo de sangue dentro do corpo",
        alternativa3: "Sangramento pelo nariz",
        alternativa4: "Sangramento na boca",
        resposta: "Acúmulo de sangue dentro do corpo"
    },
    {
        id: getNovoID(),
        pergunta: "Como ajudar uma pessoa com crise convulsiva?",
        alternativa1: "Imobilizar a pessoa",
        alternativa2: "Colocar algo na boca da pessoa",
        alternativa3: "Proteger a cabeça da pessoa",
        alternativa4: "Restringir os movimentos da pessoa",
        resposta: "Proteger a cabeça da pessoa"
    },
    {
        id: getNovoID(),
        pergunta: "Qual é o procedimento correto para tratar uma picada de abelha?",
        alternativa1: "Aplicar gelo",
        alternativa2: "Retirar o ferrão com pinça",
        alternativa3: "Espalhar pomada antibiótica",
        alternativa4: "Lavar a área com água e sabão",
        resposta: "Retirar o ferrão com pinça"
    },
    {
        id: getNovoID(),
        pergunta: "O que deve ser feito primeiro em caso de afogamento?",
        alternativa1: "Realizar respiração boca-a-boca",
        alternativa2: "Chamar ajuda profissional",
        alternativa3: "Retirar a vítima da água",
        alternativa4: "Iniciar compressões torácicas",
        resposta: "Retirar a vítima da água"
    },
    {
        id: getNovoID(),
        pergunta: "Como proceder em caso de suspeita de envenenamento?",
        alternativa1: "Induzir vômito imediatamente",
        alternativa2: "Dar água para diluir o veneno",
        alternativa3: "Ligar para o centro de intoxicações",
        alternativa4: "Esperar a pessoa melhorar",
        resposta: "Ligar para o centro de intoxicações"
    }
]


function criarQuiz() {
    const questionCount = parseInt(contadorQuestoes.value)

    if (isNaN(questionCount) || questionCount < 1) {
        alert('Escolha um número válido de questões.')
        return;
    }

    const numeroQuestoes = Math.min(questionCount, perguntas.length)

    if (numeroQuestoes === 0) {
        quizContainer.innerHTML = '<p>Não há perguntas cadastradas.</p>'
        return
    }

    setupContainer.style.display = 'none'
    quizContainer.style.display = 'block'
    quizButtons.style.display = 'flex'
    quizContainer.innerHTML = ''

    const shuffledQuestions = perguntas.sort(() => 0.5 - Math.random()).slice(0, numeroQuestoes)
    localStorage.setItem('armazenarQuestoes', JSON.stringify(shuffledQuestions))

    shuffledQuestions.forEach((pergunta, index) => {
        const questionHTML = `
            <div class="question">
                <h2>${index + 1}. ${pergunta.pergunta}</h2>
                <div class="options">
                    <div class="option">
                        <input type="radio" name="question${index}" value="${pergunta.alternativa1}">${pergunta.alternativa1}
                    </div>
                    <div class="option">
                        <input type="radio" name="question${index}" value="${pergunta.alternativa2}">${pergunta.alternativa2}
                    </div>
                    <div class="option">
                        <input type="radio" name="question${index}" value="${pergunta.alternativa3}">${pergunta.alternativa3}
                    </div>
                    <div class="option">
                        <input type="radio" name="question${index}" value="${pergunta.alternativa4}">${pergunta.alternativa4}
                    </div>
                </div>
            </div>
        `;
        quizContainer.innerHTML += questionHTML
    })
}

function submitQuiz() {
    const selectedQuestions = JSON.parse(localStorage.getItem('armazenarQuestoes')) || []
    let score = 0

    selectedQuestions.forEach((pergunta, index) => {
        const userAnswer = consultarSeletor(`input[name="question${index}"]:checked`)
        const respostas = document.getElementsByName(`question${index}`)
        let respostaCorretaEncontrada = false

        respostas.forEach((opcao) => {
            if (opcao.value === pergunta.Resposta) {
                opcao.parentElement.style.color = 'green'
                respostaCorretaEncontrada = true
            } else {
                opcao.parentElement.style.color = 'black'
            }
        })

        if (userAnswer && userAnswer.value === pergunta.Resposta) {
            score++;
            userAnswer.parentElement.style.color = 'green'
        } else if (userAnswer && userAnswer.value !== pergunta.Resposta) {
            userAnswer.parentElement.style.color = 'red'
        }

        if (!respostaCorretaEncontrada && !userAnswer) {
            respostas.forEach((opcao) => {
                if (opcao.value === pergunta.Resposta) {
                    opcao.parentElement.style.color = 'green'
                }
            })
        }
    })

    console.log(score)

    alert(`Você acertou ${score} de ${selectedQuestions.length} perguntas.`)
}

btnQuiz.addEventListener('click', criarQuiz)
btnSubmit.addEventListener('click', submitQuiz)

document.addEventListener('DOMContentLoaded', async () => {
    perguntas = await quizService.getPerguntas()
    if (perguntas.length === 0) {
        localStorage.setItem('CadastroPerguntas', JSON.stringify(obeterNovasPerguntas()))
        perguntas = JSON.parse(localStorage.getItem('CadastroPerguntas')) || []
    }

    questionCountInput.max = perguntas.length;
})


