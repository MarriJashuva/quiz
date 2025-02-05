const questions = [
    { 
        question: "What is the default value of a boolean variable in Java?", 
        options: ["true", "false", "0", "null"], 
        answer: "false"
    },
    { 
        question: "Which of the following is a valid Java keyword?", 
        options: ["function", "char", "integer", "object"], 
        answer: "char"
    },
    { 
        question: "Which class is the parent of all classes in Java?", 
        options: ["Object", "Parent", "Super", "Base"], 
        answer: "Object"
    },
    { 
        question: "What is the default value of an integer variable in Java?", 
        options: ["0", "1", "null", "undefined"], 
        answer: "0"
    },
    { 
        question: "Which method is used to find the length of a string in Java?", 
        options: ["size()", "length()", "getLength()", "lengthOf()"], 
        answer: "length()"
    },
    { 
        question: "Which of the following is used to create a thread in Java?", 
        options: ["Thread.run()", "Thread.start()", "Thread.create()", "Thread.execute()"], 
        answer: "Thread.start()"
    },
    { 
        question: "What is the size of the `int` data type in Java?", 
        options: ["16 bits", "32 bits", "64 bits", "128 bits"], 
        answer: "32 bits"
    },
    { 
        question: "Which of the following access modifiers is used to allow access only within the same package in Java?", 
        options: ["private", "protected", "public", "default"], 
        answer: "default"
    },
    { 
        question: "Which of the following is not a valid operator in Java?", 
        options: ["+", "-", "/", "&"], 
        answer: "&"
    },
    { 
        question: "Which Java package is automatically imported in every Java program?", 
        options: ["java.lang", "java.util", "java.io", "java.net"], 
        answer: "java.lang"
    }
];

const question = document.getElementById("question");
const choices = document.querySelectorAll(".choice");
const progressBar = document.getElementById("progress-bar"); // Progress bar element
let currentQuestion = 0;
let score = 0;
let timeElapsed = 0;
let timerInterval;

function startQuiz() {
    loadPage();
}

function loadPage() {
    if (currentQuestion >= questions.length) {
        let message = '';
        let feedback = '';
        
        // Decide message based on score
        if (score <= 5) {
            message = "Better luck next time!";
            feedback = `Your Score: ${score}/${questions.length}`;
        } else if (score >= 6 && score <= 8) {
            message = "Good job! Keep going!";
            feedback = `Your Score: ${score}/${questions.length}`;
        } else if (score >= 9) {
            message = "Excellent! You're a pro!";
            feedback = `Your Score: ${score}/${questions.length}`;
        }

        // Set the content in the result card
        document.getElementById('result-message').innerText = message;
        document.getElementById('result-score').innerText = feedback;

        // Hide quiz container and show result card
        document.querySelector(".container").style.display = 'none';
        document.querySelector(".result-card").style.display = 'block'; // Show the result card
        return;
    }

    resetStyles();

    const q = questions[currentQuestion];
    question.textContent = q.question;
    
    choices.forEach((choice, index) => {
        choice.textContent = q.options[index];
        choice.onclick = () => checkAnswer(choice, q.answer);
    });

    startTimer();
}

function startTimer() {
    timeElapsed = 0;
    progressBar.style.width = "0%";
    progressBar.style.background = "rgb(16, 143, 16)"; // Initially Green

    timerInterval = setInterval(() => {
        timeElapsed++;

        let widthPercentage = (timeElapsed / 30) * 100;

        if (timeElapsed < 15) {
            // Before the middle, keep the whole progress bar green
            progressBar.style.background = "rgb(16, 143, 16)";
        } else {
            // Preserve green for the first 50% and add red progressively after that
            progressBar.style.background = `linear-gradient(to right, rgb(16, 143, 16) 0% 50%, rgb(222, 57, 57) 50% 100%)`;
        }

        progressBar.style.width = `${widthPercentage}%`;

        if (timeElapsed >= 30) {
            clearInterval(timerInterval);
            currentQuestion++;
            loadPage();
        }
    }, 1000);
}

function checkAnswer(button, correctAnswer) {
    clearInterval(timerInterval); // Stop timer when user selects an answer

    if (button.textContent === correctAnswer) {
        button.style.background = "rgb(16, 143, 16)";
        score++;
    } else {
        button.style.background = "rgb(222, 57, 57)";
        // Highlight the correct answer
        choices.forEach(choice => {
            if (choice.textContent === correctAnswer) {
                choice.style.background = "rgb(16, 143, 16)";
            }
        });
    }

    choices.forEach(choice => choice.onclick = null);

    setTimeout(() => {
        currentQuestion++;
        loadPage();
    }, 3000);
}

function resetStyles() {
    choices.forEach(choice => {
        choice.style.background = "";
    });
}

// Function to restart the quiz
function playAgain() {
    // Reset all the variables and reload the quiz
    currentQuestion = 0;
    score = 0;
    document.querySelector(".result-card").style.display = 'none'; // Hide result card
    document.querySelector(".container").style.display = 'block'; // Show quiz container
    loadPage();
}

startQuiz();
