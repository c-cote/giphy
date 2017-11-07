// display countdown timer

// time runs out, the game is over

// when time runs out, the game will display the number of correct answers out of total answers

// only one answer per question - radio buttons

(function () {
  function startQuiz() {
    // storing the HTML output
    const output = [];

    // runs for each question
    myQuestions.forEach((currentQuestion, questionNumber) => {
        
      // storing the list of answer choices
      const answers = [];

      // for each available answer
      for (letter in currentQuestion.answers) {
          
        // HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // combining output list into one string of HTML
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
      
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // runs for each question
    myQuestions.forEach((currentQuestion, questionNumber) => {
        
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;    
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

    const myQuestions = [
      {
        question: "Who is the captian of the Argo?",
        answers: {
          a: "Captain Sandor",
          b: "Captain Gloval",
          c: "Captain Avatar",
          d: "Captain Kirk"
        },
        correctAnswer: "c"
      },
      {
        question: "The Argo is based on which WW2 era battleship?",
        answers: {
          a: "Yamashiro",
          b: "Kongo",
          c: "Haruna",
          d: "Yamato"
        },
        correctAnswer: "d"
      },
      {
        question: "What is the name of the Gamilon leader?",
        answers: {
          a: "Desslock",
          b: "Oshijiro",
          c: "Serex",
          d: "Mokujin"
        },
        correctAnswer: "a"
      },
      {
        question: "What is the name of the hot head who plays by his own rules?",
        answers: {
          a: "Joe Stratus",
          b: "Derek Wildstar",
          c: "Kazuya Mishima",
          d: "Jack Burton"
        },
        correctAnswer: "b"
      },
      {
        question: "Who is his partner?",
        answers: {
          a: "John Oates",
          b: "Mark Venture",
          c: "Jesse Ventura",
          d: "Homer Glitchman"
        },
        correctAnswer: "b"
      },
      {
        question: "Who is their Gamilon nemesis?",
        answers: {
          a: "Major Crass",
          b: "Colonel Vulgar",
          c: "General Boor",
          d: "Captian Crude"
        },
        correctAnswer: "b"
      },
      {
        question: "Who is the only girl on the Argo?",
        answers: {
          a: "Myumi Kino",
          b: "Inata Jones",
          c: "Nova Forrester",
          d: "Princess Invidia"
        },
        correctAnswer: "c"
      },
      {
        question: "What does the crew drink to celebrate victory?",
        answers: {
          a: "Sake",
          b: "Spring Water",
          c: "Sapporo",
          d: "Asahi"
        },
        correctAnswer: "b"
      }    
    ];
    
  // display quiz right away
  startQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();    