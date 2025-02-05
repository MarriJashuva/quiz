const questions = [
        { 
            question: "What is the default value of an uninitialized local variable in C?", 
            options: ["0", "null", "garbage value", "undefined"], 
            answer: "garbage value"
        },
        { 
            question: "Which of the following is used to include a standard input-output library in C?", 
            options: ["#include <stdio.h>", "#include <input.h>", "#include <iostream>", "#include <stdlib.h>"], 
            answer: "#include <stdio.h>"
        },
        { 
            question: "What is the size of a `char` variable in C?", 
            options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], 
            answer: "1 byte"
        },
        { 
            question: "Which of the following is the correct way to declare an array in C?", 
            options: ["int[] arr;", "int arr[];", "int arr;", "array int[];"], 
            answer: "int arr[];"
        },
        { 
            question: "What is the correct syntax for a `for` loop in C?", 
            options: ["for(i = 0; i < 10; i++)", "for(i = 0; i < 10)", "for(i = 0; i++; 10)", "for i = 0 to 10"], 
            answer: "for(i = 0; i < 10; i++)"
        },
        { 
            question: "Which of the following is used for comments in C?", 
            options: ["// comment", "/* comment */", "# comment", "<!-- comment -->"], 
            answer: "// comment"
        },
        { 
            question: "What is the correct way to return a value from a function in C?", 
            options: ["return value;", "value return;", "return(value);", "value;"], 
            answer: "return value;"
        },
        { 
            question: "Which of the following is a valid pointer declaration in C?", 
            options: ["int *ptr;", "int ptr*;", "ptr *int;", "*int ptr;"], 
            answer: "int *ptr;"
        },
        { 
            question: "What is the size of an integer variable in C on a 64-bit system?", 
            options: ["2 bytes", "4 bytes", "8 bytes", "16 bytes"], 
            answer: "4 bytes"
        },
        { 
            question: "Which of the following is not a valid operator in C?", 
            options: ["&", "&&", "|", "@@"], 
            answer: "@@"
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
    