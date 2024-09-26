
const questions = [
    {
        question: "What is the largest animal on Earth?",
        answers: [
            {text: "Shark", correct: false}, 
            {text: "Gorilla", correct: false}, 
            {text: "Blue Whale", correct: true}, 
            {text: "Elephant", correct: false}
        ]
    },
    {
        question: "What is the longest River?",
        answers: [
            {text: "Nile", correct: true}, 
            {text: "Amazon", correct: false}, 
            {text: "Hudson", correct: false}, 
            {text: "Mississippi", correct: false}
        ]
    },
    {
        question: "What is the fastest a human has traveled?",
        answers: [
            {text: "2500 mph", correct: false}, 
            {text: "250 mph", correct: false}, 
            {text: "23.35 mph", correct: false}, 
            {text: "25,000 mph", correct: true}
        ]
    },
    {
        question: "How old is the oldest living thing?",
        answers: [
            {text: "150 yrs", correct: false}, 
            {text: "1000 yrs", correct: false}, 
            {text: "5000 yrs", correct: true}, 
            {text: "200 yrs", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// Starts quiz while keeping track of the current question
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

//  Prints questions in order of the questions list
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    // Creates a button for each answer and displays the text in the button
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        // Does something I think
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// Removes all previous buttons
function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Determines whether the user is incorrect or not (using the true and false in the questions list) 
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    // Checks if user was correct if they arent itll highlight correct and move to next question
    // If they are it does the same thing. Then it disables the ability to chose another answer
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    // Makes the invisible "next" button, visible
    nextButton.style.display = "block";
 }

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}.`
    nextButton.innerHTML = "Play Again?";
    nextButton.style.display = "block";

}

 function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

// Checks if the quiz is done or not
 nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
 });


 startQuiz();