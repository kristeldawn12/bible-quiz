const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const levelUp = document.getElementById("level-up");

const CORRECT_BONUS = 20;
const MAX_QUESTIONS = 5;

function gameOver() {
  finalScore.innerText = `${mostRecentScore}${"/"}${
    CORRECT_BONUS * MAX_QUESTIONS
  }`;
  if (mostRecentScore == 100) {
    levelUp.innerHTML = `Hallelujah! 🙌🏼`;
  } else if (mostRecentScore >= 70 && mostRecentScore <= 90) {
    levelUp.innerHTML = `In Everything Give Thanks 🙏🏼`;
  } else if (mostRecentScore >= 40 && mostRecentScore <= 60) {
    levelUp.innerHTML = `Trust in the Lord 💙`;
  } else if (mostRecentScore >= 30 && mostRecentScore <= 50) {
    levelUp.innerHTML = `Read Your Bible, Pray Everyday 📖`;
  } else {
    levelUp.innerHTML = `Seek Ye First ✝️`;
  }
}

gameOver();
