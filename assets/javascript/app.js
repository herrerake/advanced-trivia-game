$(document).ready(function() {
  console.log("helloworld")
  // GLOBAL VARIABLES
  // ===================================================================

  // Creating an object to hold our questions.
  let questions = [{
    question: "",
    answers: ["", "", "", ""],
    correctAnswer: ""
  },
  {
    question: "",
    answers: ["", "", "", ""],
    correctAnswer: ""
  },
  {
    question: "",
    answers: ["", "", "", ""],
    correctAnswer: ""
  },
  {
    question: "",
    answers: ["", "", "", ""],
    correctAnswer: ""
  },
  {
    question: "",
    answers: ["", "", "", ""],
    correctAnswer: ""
  }];

  // variables to hold our set interval and counter
  let timer;
  let countStartNum = 25;

  var viewPort = $("quiz-area");

  // creating the game object to hold the functions and variables to the game
  var game = {
    gameQuestions: questions,
    currentQuestion: 0,
    counter: countStartNum,
    correct: 0,
    incorrect: 0,

    countdown: function() {
      this.counter--;
      $("#counterNum").text(this.counter);
      if (this.counter === 0) {
        console.log("TIME UP");
        this.timeUp();
      }
    },
    // The bind() method creates a new function that, when called, has its
    // this keyword set to the provided value, with a given sequence of arguments
    // preceding any provided when the new function is called.
    loadQuestion: function() {
      timer = setInterval(this.countdown.bind(this), 1000);

      viewPort.html("<h2>" + gameQuestions[this.currentQuestion].question + "</h2>");

      for (var i = 0; i < gameQuestions[this.currentQuestion].answers.length; i++) {
        viewPort.append("<button class='answer-btn' id='button' data-name='" + gameQuestions[this.currentQuestion].answers[i]
        + "'>" + gameQuestions[this.currentQuestion].answers[i] + "</button>");
      }
    },

    nextQuestion: function() {
      this.counter = window.countStartNum;
      $("#counter-num").text(this.counter);
      this.currentQuestion++;
      this.loadQuestion.bind(this)();
    },

    timeUp: function() {

      clearInterval(window.timer);

      $("#counter-num").text(this.counter);

      viewPort.html("<h2>Out of Time!</h2>");
      viewPort.append("<h3>The Correct Answer Was: " + gameQuestions[this.currentQuestion].correctAnswer);

      if (this.currentQuestion === questions.length - 1) {
        setTimeout(this.results, 2 * 1000);
      }
      else {
        setTimeout(this.nextQuestion, 2 * 1000);
      }
    },

    results: function() {

      clearInterval(window.timer);

      viewPort.html("<h2>Quiz Complete, here is how you did!</h2>");

      $("#counterNum").text(this.counter);

      viewPort.append("<h3>Correct Answers: " + this.correct + "</h3>");
      viewPort.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
      viewPort.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
      viewPort.append("<br><button id='start-over'>Start Over?</button>");
    },

    clicked: function(e) {
      clearInterval(window.timer);
      if ($(e.target).attr("data-name") === gameQuestions[this.currentQuestion].correctAnswer) {
        this.answeredCorrectly();
      }
      else {
        this.answeredIncorrectly();
      }
    },

    answeredIncorrectly: function() {

      this.incorrect++;

      clearInterval(window.timer);

      viewPort.html("<h2>WRONG!</h2>");
      viewPort.append("<h3>The Correct Answer was: " + gameQuestions[this.currentQuestion].correctAnswer + "</h3>");

      if (this.currentQuestion === question.length -1) {
        setTimeout(this.results.bind(this), 2 * 1000);
      }
      else {
        setTimeout(this.nextQuestion.bind(this), 2 * 1000)
      }
    },

    answeredCorrectly: function() {

      clearInterval(window.timer);

      this.correct++;

      viewPort.html("<h2>Correct!</h2>");

      if (this.currentQuestion === questions.length -1) {
        setTimeout(this.results.bind(this), 2 * 1000);
      }
      else {
        setTimeout(this.nextQuestion.bind(this), 2 * 1000);
      }
    },

    reset: function() {
      this.currentQuestion = 0;
      this.counter = countStartNum;
      this.correct = 0;
      this.incorrect = 0;
      this.loadQuestion();
    }
  };

  // CLICK EVENTS

  $(document).on("click", "#start-over", game.reset.bind(game));

  $(document).on('click', ".answer-btn", function(e) {
    game.clicked.bind(game, e)();
  });

  $(document).on("click", "#start", function() {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-num'>25</span> Seconds</h2>");
    game.loadQuestion.bind(game)();
  });
});
