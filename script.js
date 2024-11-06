const questions = [
    {
        question: "Apa ibu kota Prancis?",
        options: ["Berlin", "Madrid", "Paris", "Roma"],
        answer: "Paris",
        type: "multiple"
    },
    {
        question: "Berapakah hasil dari 2 + 2?",
        answer: "4",
        type: "fill"
    },
    {
        question: "Siapakah penulis drama 'Hamlet'?",
        options: ["Shakespeare", "Hemingway", "Tolkien", "Rowling"],
        answer: "Shakespeare",
        type: "multiple"
    },
    {
        question: "Berapa titik didih air dalam derajat Celcius?",
        answer: "100",
        type: "fill"
    },
    {
        question: "Planet manakah yang terbesar di tata surya kita?",
        options: ["Bumi", "Mars", "Jupiter", "Saturnus"],
        answer: "Jupiter",
        type: "multiple"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let playerName = localStorage.getItem('name');
let playerNim = localStorage.getItem('nim');

function showQuestion() {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = '';
    const currentQuestion = questions[currentQuestionIndex];
    
    const questionElement = document.createElement('div');
    questionElement.innerHTML = `<h2>${currentQuestion.question}</h2>`;
    
    if (currentQuestion.type === 'multiple') {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        currentQuestion.options.forEach(option => {
            optionsContainer.innerHTML += `
                <button class="option-button" onclick="checkAnswer('${option}')">
                    ${option}
                </button>
            `;
        });
        questionElement.appendChild(optionsContainer);
    } else {
        questionElement.innerHTML += `
            <div class="fill-answer">
                <input type="text" id="answer" placeholder="Ketik jawaban Anda di sini" required>
                <button class="submit-button" onclick="checkAnswer(document.getElementById('answer').value)">
                    Jawab
                </button>
            </div>
        `;
    }
    
    questionContainer.appendChild(questionElement);
    updateStatus();
    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            showResult();
        }
    }, 30000); // 30 detik untuk setiap pertanyaan
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
        score += 5; // Tambah 5 poin untuk jawaban benar
    }
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = `
        <h2>Kuis Selesai!</h2>
        <p>Nama: ${playerName}</p>
        <p>NIM: ${playerNim}</p>
        <p>Nilai Total: ${score}</p>
        <button onclick="window.location.href='index.html'" class="button">Kembali ke Beranda</button>
    `;
    localStorage.setItem('score', score);
}

function updateStatus() {
    const status = document.getElementById('status');
    status.innerHTML = `Pertanyaan ${currentQuestionIndex + 1} dari ${questions.length}`;
}

// Function to initialize the quiz
function initQuiz() {
    showQuestion();
}

// Call initQuiz when the quiz page is loaded
if (document.getElementById('questionContainer')) {
    initQuiz();
}