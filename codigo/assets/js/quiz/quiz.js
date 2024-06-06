document.addEventListener('DOMContentLoaded', () => {
    const questionCountInput = document.getElementById('questionCount');
    const perguntas = JSON.parse(localStorage.getItem('CadastroPerguntas')) || [];
    questionCountInput.max = perguntas.length;
});

function startQuiz() {
    const questionCount = parseInt(document.getElementById('questionCount').value);
    const quizContainer = document.getElementById('quiz-container');
    const setupContainer = document.getElementById('setup-container');
    const quizButtons = document.querySelector('.quiz-buttons');

    if (isNaN(questionCount) || questionCount < 1) {
        alert('Por favor, insira um número válido de questões.');
        return;
    }

    const perguntas = JSON.parse(localStorage.getItem('CadastroPerguntas')) || [];
    const numberOfQuestions = Math.min(questionCount, perguntas.length);

    if (numberOfQuestions === 0) {
        quizContainer.innerHTML = '<p>Não há perguntas cadastradas.</p>';
        return;
    }

    setupContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    quizButtons.style.display = 'flex';

    quizContainer.innerHTML = '';

    const shuffledQuestions = perguntas.sort(() => 0.5 - Math.random()).slice(0, numberOfQuestions);

    shuffledQuestions.forEach((pergunta, index) => {
        const questionHTML = `
            <div class="question">
                <h2>${pergunta.pergunta}</h2>
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
    const questionCount = parseInt(document.getElementById('questionCount').value);
    const numberOfQuestions = Math.min(questionCount, perguntas.length);
    let score = 0;

    perguntas.slice(0, numberOfQuestions).forEach((pergunta, index) => {
        const userAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (userAnswer && userAnswer.value === pergunta.Resposta) {
            score++;
        }
    });

    alert(`Você acertou ${score} de ${numberOfQuestions} perguntas.`);
}
