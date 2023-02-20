var questions = [
  {
    question: 'How can a datatype be declared to be a constant type?',
    choices: ['const', 'var', 'let', 'constant'],
    answer: 'const',
  },
  {
    question: 'When the switch statement matches the expression with the given labels, how is the comparison done?',
    choices: [
    'Both the datatype and the result of the expression are compared.', 
    'Only the datatypeof the expression is compared.', 
    'Only the value of the expression is compared', 
    'None of the above.'],
    answer: 'Both the datatype and the result of the expression are compared.', 
  },
  {
    question: 'When an operator value is NULL, the typeof returned by the unary operator is:',
    choices: ['undefined', 'booleans', 'object', 'integar'],
    answer: 'object',
  },
  {
    question: 'Which function is used to serialize an object into a JSON string in Javascript?',
    choices: ['stringify()', 'parse()', 'convert()', 'none of the above'],
    answer: 'stringify()',
  },
  {
    question: 'Which of the following is not a Javascript framework?',
    choices: ['node', 'vue', 'react', 'term'],
    answer: 'term',
  },
];

var timerEl = document.getElementById("count");
var questionaireEl = document.getElementById("questionthing-screen");
var questionEl = document.getElementById("questions-made");
var choicesEl = document.getElementById("choices");
var answerEl = document.getElementById("answers");


var justTime = questions.length * 15;
var time;
var currentIndex = 0;
var answerComfirm = [];

function startQuiz() {
  var homeScreenEl = document.getElementById("home-screen");
    homeScreenEl.setAttribute("class", "hide");
    questionaireEl.removeAttribute("class", "hide");
    timerEl.textContent = justTime;

    timeBegin();
    renderQuestions();
}

function renderQuestions() {
  questionEl.innerHTML = questions[currentIndex].question;
 
  document.getElementById("yeah").innerHTML = currentIndex;
  
  var choices = questions[currentIndex].choices;
  
   for (var i = 0; i < choices.length; i++) {
      var choiceOption = choices[i];
      var choiceEl = document.createElement("button");


      choiceEl.setAttribute("class", "choice");
      choiceEl.setAttribute("value", choiceOption);
      choiceEl.innerHTML = i + 1 + ". " + choiceOption;

      choicesEl.appendChild(choiceEl);
    }
  
  AnswerConfirm();
}

function AnswerConfirm() {
  if (answerConfirm.length !== 0) { 
    if (answerConfirm.length === 1) {
      answerEl.removeAttribute("class", "hide");
    }
    var answerConfirmEl = document.createElement("p");
    answerConfirmEl.innerHTML = "Question " + (answerConfirm.length) + ": " + answerConfirm.slice(-1);
    answerSheetEl.appendChild(answerConfirmEl);
  }
}

function timeBegin() {
  time = setInterval( function() {
    if (justTime > 0) {
      justTime--;
      timerEl.textContent = justTime;
    } else {
      endQuiz();
    }
    }, 1000);
}

function endQuiz() {
  clearInterval(time);

  var completeScreenEl = document.getElementById("complete-screen");
  completeScreenEl.removeAttribute("class");

  var endingScoreEl = document.getElementById("ending-score");
  endingScoreEl.textContent = justTime;

  questionaireEl.setAttribute("class", "hide");
}

function checkDecision() {
  
  if (event.target.className === "choice") {
    
    if (event.target.value !== questions[currentIndex].answer) {
      justTime -= 15;
   
      if (justTime < 0 ) {
        justTime = 0;
      }
      timerEl.textContent = justTime;
      answerEl.innerHTML = "Incorrect!";
    } else {
      answerEl.innerHTML = "Correct!";
    }
    
    if (justTime <= 0 || currentIndex >= (questions.length-1)) {
      endQuiz();
    } else {
      currentIndex++;

      while (choicesEl.firstChild) {
        choicesEl.removeChild(choicesEl.firstChild);
    }
      renderQuestions();}
      
  }
}

function saveHighscore() {
  var initials = document.getElementById("initials").value.trim();

  if (initials !== '') {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [] ;
    var newScore = {
      score: justTime,
      initials: initials,
    };
    
    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  }
}

function checkEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// Starts the quiz 
document.getElementById("begin").addEventListener("click", startQuiz);
// Checks accuracy of the answer chosen
document.getElementById("choices").addEventListener("click", checkDecision);
// Submit score on button click
document.getElementById("submit").addEventListener("click", saveHighscore);
// Checks the key for a keyup event within the input field
document.getElementById("initials").addEventListener("keyup", checkEnter);