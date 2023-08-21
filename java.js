const questionText = document.getElementById('question-text');
const options = document.querySelectorAll('.option');
const submitAnswerButton = document.getElementById('submit-answer');
const message = document.getElementById('message');
const scoreElement = document.getElementById('score');

const questions = [
    {
        question: 'De quem é a famosa frase “Penso, logo existo”?',
        options: ['A- Platão', 'B- Descartes', 'C- Galileu Galilei', 'D- Sócrates'],
        correctAnswer: 1,
        points: 10
    },
    {
        question: 'De onde é a invenção do chuveiro elétrico?',
        options: ['A- Brasil', 'B- França', 'C- Inglaterra', 'D- Austrália'],
        correctAnswer: 0,
        points: 10
    },
    {
        question: 'Qual o livro mais vendido no mundo a seguir à Bíblia?',
        options: ['A- O Senhor dos Anéis', 'B- O Pequeno Príncipe', 'C- Um Conto de Duas Cidades', 'D- Dom Quixote'],
        correctAnswer: 3,
        points: 10
    },
    {
        question: 'Quantas casas decimais tem o número pi?',
        options: ['A- Centenas', 'B- Duas', 'C- Milhares', 'D- Infinitas'],
        correctAnswer: 3,
        points: 10
    },
    {
        question: 'Atualmente, quantos elementos químicos a tabela periódica possui?',
        options: ['A- 110', 'B- 120', 'C- 107', 'D- 118'],
        correctAnswer: 3,
        points: 10
    }, // Adicione as outras perguntas aqui...// Adicione as outras perguntas aqui...
];

let currentQuestionIndex = 0;
let chances = 2;
let score = 0;

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = `Pergunta ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    options.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctAnswer) {
        score += currentQuestion.points;
        scoreElement.textContent = `Pontuação: ${score}`;
        message.textContent = 'Resposta correta!';
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            questionText.textContent = 'Parabéns, você completou o quiz!';
            options.forEach(option => option.style.display = 'none');
            submitAnswerButton.style.display = 'none';
        }
    } else {
        chances--;

        if (chances === 0) {
            questionText.textContent = 'Você errou todas as chances. Recomece o quiz.';
            options.forEach(option => option.style.display = 'none');
            submitAnswerButton.style.display = 'none';
        } else {
            message.textContent = 'Resposta incorreta. Tente novamente.';
        }
    }
}

displayQuestion();

submitAnswerButton.addEventListener('click', () => {
    const selectedOptionIndex = Array.from(options).findIndex(option => option.classList.contains('selected'));
    if (selectedOptionIndex !== -1) {
        checkAnswer(selectedOptionIndex);
    } else {
        message.textContent = 'Selecione uma opção antes de responder.';
    }
});

options.forEach((option, index) => {
    option.addEventListener('click', () => {
        options.forEach(option => option.classList.remove('selected'));
        option.classList.add('selected');
    });
});