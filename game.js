const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let alreadyAnswered = false;

// Q&A Array
let questions = [
  {
    question: "Who is Jesus Christ?",
    choice1: "The beloved",
    choice2: "The father of many nation",
    choice3: "The Holy one of Israel",
    choice4: "The dreamer",
    answer: 3,
  },
  {
    question: "Gifts given by the 3 Wise Men to baby Jesus.",
    choice1: "Gold, Myrrh, Spices",
    choice2: "Gold, Diamonds, Silver",
    choice3: "Gold, Frankincense, Ruby ",
    choice4: "Gold, Frankincense, Myrrh",
    answer: 4,
  },
  {
    question: "Where was Jesus Born",
    choice1: "Jerusalem",
    choice2: "Nazareth",
    choice3: "Bethlehem",
    choice4: "Galilee",
    answer: 3,
  },
  {
    question: "Who is the weeping prophet?",
    choice1: "Ezekiel",
    choice2: "Jeremiah",
    choice3: "Isaiah",
    choice4: "Daniel",
    answer: 2,
  },

  {
    question: "Where did Moses see the burning bush?",
    choice1: "Mount Hermon",
    choice2: "Mount Carmel",
    choice3: "Mount Sinai",
    choice4: "Mount Apo",
    answer: 3,
  },
];

const CORRECT_BONUS = 20;
const MAX_QUESTIONS = 5;

// setting starting point

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  alreadyAnswered = false;

  // this stores scores to the score counter during the game as well as at the end page
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    // go to the end page
    return window.location.assign("/bible-quiz/end.html");
  }

  // Counter for questions left

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

  // Updating progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  // Generating random questions & answers from the question array

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    // check if already answered
    if (alreadyAnswered) {
      return;
    }
    alreadyAnswered = true;

    // selecting any answers

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // it will look for the "answer" in the object array then
    // then will adds colour green if correct or red if incorrect answer by adding a class of correct or incorrect to the choice-container

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    selectedChoice.parentElement.classList.add(classToApply);

    // once answer is given and checked, this will set a delay and remove the colours before going to the next question

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);

    // this adds a score if answer is correct

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    // check if already answered
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
