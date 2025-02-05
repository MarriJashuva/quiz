const questions = [
    { 
        question: "What is the correct extension of the Python file?", 
        options: [".py", ".python", ".pyt", ".pyth"], 
        answer: ".py"
    },
    { 
        question: "Which of the following is not a Python data type?", 
        options: ["List", "Tuple", "String", "Character"], 
        answer: "Character"
    },
    { 
        question: "How do you create a function in Python?", 
        options: ["function myFunc()", "def myFunc():", "create myFunc():", "function:myFunc"], 
        answer: "def myFunc():"
    },
    { 
        question: "What is the output of print(2**3)?", 
        options: ["6", "8", "16", "None"], 
        answer: "8"
    },
    { 
        question: "Which of the following is the correct syntax for creating a class in Python?", 
        options: ["class MyClass():", "class MyClass{}:", "def MyClass():", "class MyClass"], 
        answer: "class MyClass():"
    },
    { 
        question: "Which of the following is a Python library used for data analysis?", 
        options: ["NumPy", "TensorFlow", "pandas", "Keras"], 
        answer: "pandas"
    },
    { 
        question: "What is the purpose of the pass statement in Python?", 
        options: ["It is used to skip a function", "It is used to terminate a loop", "It is used as a placeholder", "It is used to break out of a loop"], 
        answer: "It is used as a placeholder"
    },
    { 
        question: "How do you handle exceptions in Python?", 
        options: ["try-catch", "try-except", "try-finally", "catch-except"], 
        answer: "try-except"
    },
    { 
        question: "What is the output of print(type(3.14))?", 
        options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'complex'>"], 
        answer: "<class 'float'>"
    },
    { 
        question: "Which method is used to remove a specified item from a list in Python?", 
        options: ["remove()", "del()", "pop()", "clear()"], 
        answer: "remove()"
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
