// Inicialize a pontuação do usuário e a pontuação máxima
let userScore = 0;
let maxScore = 500;

// Função para adicionar pontos
function addPoints(points) {
    userScore += points; // Adiciona os pontos ao score do usuário
    updateProgressBar(); // Atualiza a barra de progresso
}

// Função para atualizar a barra de progresso e mudar a cor ao atingir 50% e 100%
function updateProgressBar() {
    let progress = (userScore / maxScore) * 100;
    let progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = progress + '%';

    // Muda a cor da barra de progresso baseado no progresso
    if (progress >= 100) {
        progressBar.style.backgroundColor = 'gold'; // Cor para 100%
    } else if (progress >= 50) {
        progressBar.style.backgroundColor = 'green'; // Cor para 50%
    } else {
        progressBar.style.backgroundColor = 'blue'; // Cor padrão
    }
}


addPoints(0); // Deixa a barra zerada para o teste por meio do botão//
