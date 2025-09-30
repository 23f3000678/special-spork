
const quizData = [
  {
    question: "Which ingredient is the main base of guacamole?",
    options: ["Tomato", "Avocado", "Potato", "Cucumber"],
    answer: "Avocado"
  },
  {
    question: "Which country is famous for sushi?",
    options: ["India", "Japan", "Italy", "Mexico"],
    answer: "Japan"
  },
  {
    question: "What is the main ingredient in hummus?",
    options: ["Chickpeas", "Lentils", "Rice", "Beans"],
    answer: "Chickpeas"
  }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");


function loadQuestion() {
  const q = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <h3>${q.question}</h3>
    <ul>
      ${q.options.map(opt => 
        `<li><label><input type="radio" name="answer" value="${opt}"> ${opt}</label></li>`
      ).join('')}
    </ul>
  `;
}
loadQuestion();


function nextQuestion() {
  const selected = document.querySelector("input[name='answer']:checked");
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  if (selected.value === quizData[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    quizContainer.innerHTML = `
      <h3>Quiz Completed!</h3>
      <p>Your Score: ${score} / ${quizData.length}</p>
    `;
    nextBtn.style.display = "none";
  }
}
