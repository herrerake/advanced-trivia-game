$(document).ready(function() {
  console.log("helloworld")
  // GLOBAL VARIABLES
  // ===================================================================

  // Creating an object to hold our questions.
  let questions = [{
    question: "What was Daniela's first car?",
    answers: ["Honda Civic", "Jeep Wrangler", "Toyota Camry", "Nissan Sentra"],
    correctAnswer: "Nissan Sentra"
  },
  {
    question: "What is Daniela's main dog's name?",
    answers: ["Reeces", "Snickers", "Stewie", "Lola"],
    correctAnswer: "Snickers"
  },
  {
    question: "Where was Daniela born?",
    answers: ["Argentina", "Virginia", "Portugal", "Angola"],
    correctAnswer: "Portugal"
  },
  {
    question: "When does Daniela find it okay to NOT pee in a restroom?",
    answers: ["During a hike", "In an emergency and theres not bathroom in sight", "When the laughing can't stop", "All of the above"],
    correctAnswer: "All of the above"
  },
  {
    question: "True or False: Did Daniela have braces for 2 years to fix her grill?",
    answers: ["TRUUUUUE", "False"],
    correctAnswer: "TRUUUUUE"
  },
  {
    question: "What is a sure fire way to get Daniela's attention and see that million dollar smile?",
    answers: ["Hey Daniela", "Ayo D", "Excuse me miss", "OYE FEA!"],
    correctAnswer: "OYE FEA!"
  }];

  // variables to hold our set interval and counter
  let timer;
  let countStartNum = 25;

  var viewPort = $("#quiz-area");

  // creating the game object to hold the functions and variables to the game
  var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countStartNum,
    correct: 0,
    incorrect: 0,

    countdown: function() {
      game.counter--;
      $("#counterNum").text(game.counter);
      if (game.counter === 0) {
        console.log("TIME UP");
        game.timeUp();
      }
    },

    loadQuestion: function() {
      timer = setInterval(game.countdown, 1000);

      viewPort.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

      for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
        viewPort.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
        + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
      }
    },

    nextQuestion: function() {
      game.counter = countStartNum;
      $("#counterNum").text(game.counter);
      game.currentQuestion++;
      game.loadQuestion();
    },

    timeUp: function() {

      clearInterval(timer);

      $("#counterNum").html(game.counter);

      viewPort.html("<h2>Out of Time!</h2>");
      viewPort.append("<h3>The Correct Answer Was: " + questions[this.currentQuestion].correctAnswer);

      if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 3 * 1000);
      }
      else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },

    results: function() {

      clearInterval(timer);

      viewPort.html("<h2>Quiz Complete, here is how you did!</h2>");

      $("#counterNum").text(game.counter);

      viewPort.append("<h3>Correct Answers: " + game.correct + "</h3>");
      viewPort.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
      viewPort.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
      viewPort.append("<br><button id='start-over'>Start Over?</button>");
    },

    clicked: function(e) {
      clearInterval(timer);
      if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
        this.answeredCorrectly();
      }
      else {
        this.answeredIncorrectly();
      }
    },

    answeredIncorrectly: function() {

      game.incorrect++;

      clearInterval(timer);

      viewPort.html("<h2 style='color:red'>WRONG!</h2>");
      viewPort.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");

      if (game.currentQuestion === questions.length -1) {
        setTimeout(game.results, 3 * 1000);
      }
      else {
        setTimeout(game.nextQuestion, 3 * 1000)
      }
    },

    answeredCorrectly: function() {

      clearInterval(timer);

      game.correct++;

      viewPort.html("<h2 style='color:green'>Correct!</h2>");

      if (game.currentQuestion === questions.length -1) {
        setTimeout(game.results, 3 * 1000);
      }
      else {
        setTimeout(game.nextQuestion, 3 * 1000);
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

  $(document).on("click", "#start-over", function() {
    game.reset();
  });

  $(document).on('click', ".answer-button", function(e) {
    game.clicked(e);
  });

  $(document).on("click", "#start", function() {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counterNum'>25</span> Seconds</h2>");
    game.loadQuestion();
  });
});
