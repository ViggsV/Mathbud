const sam = new SamJs();

sam.voice = {
  speed: 72,
  pitch: 64,
  throat: 128,
  mouth: 128,
};

const answerBox = document.getElementById("answerBox");
const calcButtons = document.querySelectorAll(".calcButton");

let currentExpression = "";

function updateDisplay(value) {
  answerBox.textContent = value;
}

// error messages
const errorResponses = [
  "Nice job breaking it, hero.",
  "You are not a good person. You know that, right?",
  "You look great, by the way. Very healthy.",
  "Congratulations on beating the odds and somehow managing to pack on a few pounds.",
  "Well, this is the part where he kills us.",
  "No good",
  "Does not compute!",
  "I broke my brain.",
  "Nope. Try again.",
  "Stop that!",
  "You call that math?",
  "I hate you",
  "That is illegal.",
];

calcButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = this.textContent;

    if (value === "=") {
      try {
        // Convert percent expressions
        const sanitizedExpression = currentExpression.replace(
          /(\d+)%/g,
          "($1*0.01)"
        );
        const result = math.evaluate(sanitizedExpression);
        currentExpression = result.toString();
        updateDisplay(currentExpression);
        sam.speak(`The answer is ${currentExpression}`);
      } catch (error) {
        // Handle errors and provide random error responses
        const randomError =
          errorResponses[Math.floor(Math.random() * errorResponses.length)];
        updateDisplay("Error");
        currentExpression = "";
        sam.speak(randomError);
      }
    } else if (value === "CE") {
      currentExpression = "";
      updateDisplay("0");
      sam.speak("Cleared");
    } else {
      if (value === "%") {
        currentExpression += "%";
      } else {
        currentExpression += value;
      }

      updateDisplay(currentExpression);

      // Don't say "equals", just skip it
      if (value !== "=") {
        let spoken = value;

        // Special cases for better readability and prevent error on brackets
        if (value === "(") spoken = "open bracket";
        if (value === ")") spoken = "close bracket";
        if (value === "%") spoken = "percent";
        if (value === ".") spoken = "decimal";
        if (value === "-") spoken = "minus";

        sam.speak(spoken);
      }
    }
  });
});
