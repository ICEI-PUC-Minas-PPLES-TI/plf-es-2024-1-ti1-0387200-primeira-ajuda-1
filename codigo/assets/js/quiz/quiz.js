document.addEventListener('DOMContentLoaded', () => {
    const questionCountInput = document.getElementById('contadorQuestoes');
    const perguntas = JSON.parse(localStorage.getItem('CadastroPerguntas')) || [];

    if (perguntas.length === 0) {
        const novasPerguntas = getNovasPerguntas();
        localStorage.setItem('CadastroPerguntas', JSON.stringify(novasPerguntas));
    }

    questionCountInput.max = perguntas.length;
});

function getNovoID() {
    const perguntas = JSON.parse(localStorage.getItem('CadastroPerguntas')) || [];
    return perguntas.length > 0 ? Math.max(perguntas.map(p => p.id)) + 1 : 1;
}

function getNovasPerguntas() {
    return [
        {
            id: getNovoID(),
            pergunta: "Qual é a primeira coisa a fazer ao chegar em uma cena de acidente?",
            Alternativa1: "Chamar ajuda profissional",
            Alternativa2: "Checar a segurança do local",
            Alternativa3: "Mover a vítima",
            Alternativa4: "Iniciar a RCP",
            Resposta: "Checar a segurança do local"
        },
        {
            id: getNovoID(),
            pergunta: "Qual é o número de emergência do SAMU no Brasil?",
            Alternativa1: "192",
            Alternativa2: "190",
            Alternativa3: "193",
            Alternativa4: "194",
            Resposta: "192"
        },
        {
            id: getNovoID(),
            pergunta: "Qual é a sequência correta da RCP em adultos?",
            Alternativa1: "Compressões, respirações, desfibrilação",
            Alternativa2: "Respirações, compressões, desfibrilação",
            Alternativa3: "Compressões, desfibrilação, respirações",
            Alternativa4: "Desfibrilação, compressões, respirações",
            Resposta: "Compressões, respirações, desfibrilação"
        },
        {
            id: getNovoID(),
            pergunta: "O que deve ser feito em caso de queimadura de primeiro grau?",
            Alternativa1: "Aplicar gelo diretamente",
            Alternativa2: "Cobrir com pano sujo",
            Alternativa3: "Resfriar com água corrente",
            Alternativa4: "Perfurar as bolhas",
            Resposta: "Resfriar com água corrente"
        },
        {
            id: getNovoID(),
            pergunta: "Como identificar uma fratura exposta?",
            Alternativa1: "Dor intensa e inchaço",
            Alternativa2: "Osso visível através da pele",
            Alternativa3: "Movimento anormal no local da fratura",
            Alternativa4: "Aparência pálida da pele",
            Resposta: "Osso visível através da pele"
        },
        {
            id: getNovoID(),
            pergunta: "O que é importante evitar ao socorrer uma vítima de choque elétrico?",
            Alternativa1: "Usar um isolante para afastar a fonte de energia",
            Alternativa2: "Tocar a vítima enquanto ainda está em contato com a fonte de energia",
            Alternativa3: "Chamar a emergência imediatamente",
            Alternativa4: "Verificar a respiração da vítima",
            Resposta: "Tocar a vítima enquanto ainda está em contato com a fonte de energia"
        },
        {
            id: getNovoID(),
            pergunta: "Qual é o principal sintoma de uma concussão?",
            Alternativa1: "Dor de estômago",
            Alternativa2: "Dor de cabeça",
            Alternativa3: "Dificuldade para respirar",
            Alternativa4: "Náusea e vômito",
            Resposta: "Dor de cabeça"
        },
        {
            id: getNovoID(),
            pergunta: "O que fazer ao encontrar alguém engasgado que não pode falar?",
            Alternativa1: "Iniciar a manobra de Heimlich",
            Alternativa2: "Oferecer água",
            Alternativa3: "Pedir para tossir",
            Alternativa4: "Deitar a pessoa de lado",
            Resposta: "Iniciar a manobra de Heimlich"
        },
        {
            id: getNovoID(),
            pergunta: "Como tratar uma entorse leve no tornozelo?",
            Alternativa1: "Aplicar calor",
            Alternativa2: "Aplicar gelo",
            Alternativa3: "Imobilizar e manter elevado",
            Alternativa4: "Continuar caminhando normalmente",
            Resposta: "Aplicar gelo"
        },
        {
            id: getNovoID(),
            pergunta: "Qual é o primeiro passo ao realizar a RCP?",
            Alternativa1: "Verificar a resposta da vítima",
            Alternativa2: "Ligar para os serviços de emergência",
            Alternativa3: "Iniciar compressões torácicas",
            Alternativa4: "Realizar respirações boca-a-boca",
            Resposta: "Verificar a resposta da vítima"
        },
        {
            id: getNovoID(),
            pergunta: "O que é uma hemorragia interna?",
            Alternativa1: "Perda de sangue visível fora do corpo",
            Alternativa2: "Acúmulo de sangue dentro do corpo",
            Alternativa3: "Sangramento pelo nariz",
            Alternativa4: "Sangramento na boca",
            Resposta: "Acúmulo de sangue dentro do corpo"
        },
        {
            id: getNovoID(),
            pergunta: "Como ajudar uma pessoa com crise convulsiva?",
            Alternativa1: "Imobilizar a pessoa",
            Alternativa2: "Colocar algo na boca da pessoa",
            Alternativa3: "Proteger a cabeça da pessoa",
            Alternativa4: "Restringir os movimentos da pessoa",
            Resposta: "Proteger a cabeça da pessoa"
        },
        {
            id: getNovoID(),
            pergunta: "Qual é o procedimento correto para tratar uma picada de abelha?",
            Alternativa1: "Aplicar gelo",
            Alternativa2: "Retirar o ferrão com pinça",
            Alternativa3: "Espalhar pomada antibiótica",
            Alternativa4: "Lavar a área com água e sabão",
            Resposta: "Retirar o ferrão com pinça"
        },
        {
            id: getNovoID(),
            pergunta: "O que deve ser feito primeiro em caso de afogamento?",
            Alternativa1: "Realizar respiração boca-a-boca",
            Alternativa2: "Chamar ajuda profissional",
            Alternativa3: "Retirar a vítima da água",
            Alternativa4: "Iniciar compressões torácicas",
            Resposta: "Retirar a vítima da água"
        },
        {
            id: getNovoID(),
            pergunta: "Como proceder em caso de suspeita de envenenamento?",
            Alternativa1: "Induzir vômito imediatamente",
            Alternativa2: "Dar água para diluir o veneno",
            Alternativa3: "Ligar para o centro de intoxicações",
            Alternativa4: "Esperar a pessoa melhorar",
            Resposta: "Ligar para o centro de intoxicações"
        }
    ];
}

function funcaoQuiz() {
    const questionCount = parseInt(document.getElementById('contadorQuestoes').value);
    const quizContainer = document.getElementById('quiz-container');
    const setupContainer = document.getElementById('setup-container');
    const quizButtons = document.querySelector('.quiz-buttons');

    if (isNaN(questionCount) || questionCount < 1) {
        alert('Por favor, insira um número válido de questões.');
        return;
    }

    const perguntas = JSON.parse(localStorage.getItem('CadastroPerguntas')) || [];
    const numeroQuestoes = Math.min(questionCount, perguntas.length);

    if (numeroQuestoes === 0) {
        quizContainer.innerHTML = '<p>Não há perguntas cadastradas.</p>';
        return;
    }

    setupContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    quizButtons.style.display = 'flex';

    quizContainer.innerHTML = '';

    const shuffledQuestions = perguntas.sort(() => 0.5 - Math.random()).slice(0, numeroQuestoes);

    shuffledQuestions.forEach((pergunta, index) => {
        const questionHTML = `
            <div class="question">
                <h2>${index + 1}. ${pergunta.pergunta}</h2>
                <div class="options">
                    <div class="option">
                        <input type="radio" name="question${index}" value="${pergunta.Alternativa1}">${pergunta.Alternativa1}
                    </div>
                    <div class="option">
                        <input type="radio" name="question${index}" value="${pergunta.Alternativa2}">${pergunta.Alternativa2}
                    </div>
                    <div class="option">
                        <input type="radio" name="question${index}" value="${pergunta.Alternativa3}">${pergunta.Alternativa3}
                    </div>
                    <div class="option">
                        <input type="radio" name="question${index}" value="${pergunta.Alternativa4}">${pergunta.Alternativa4}
                    </div>
                </div>
            </div>
        `;
        quizContainer.innerHTML += questionHTML;
    });
}

function submitQuiz() {
    const perguntas = JSON.parse(localStorage.getItem('CadastroPerguntas')) || [];
    const questionCount = parseInt(document.getElementById('contadorQuestoes').value);
    const numeroQuestoes = Math.min(questionCount, perguntas.length);
    let score = 0;

    perguntas.slice(0, numeroQuestoes).forEach((pergunta, index) => {
        const userAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (userAnswer && userAnswer.value === pergunta.Resposta) {
            score++;
        }
    });

    alert(`Você acertou ${score} de ${numeroQuestoes} perguntas.`);
}