const questions = [
  {
    question: "How many years have passed since we were together?",
    options: ["1", "2", "3", "We were together in our last 6 lives"],
    correct: 1,
    right: "You remember, Diya! ❤️",
    sweet: "Every number feels small against our story. ❤️"
  },
  {
    question: "Where did we first meet?",
    options: ["At the gate of GSFC college", "At the EME temple", "At Blue Oven Cafe", "We met in our previous life"],
    correct: 3,
    right: "Of course our story goes beyond this life! ✨",
    sweet: "Wherever it was, it led us to each other. 💗"
  },
  {
    question: "What was my first gift to you?",
    options: ["A t-shirt", "A bangle", "A Pikachu keychain", "My heart"],
    correct: 2,
    right: "A tiny Pikachu, with a lot of love! ⚡",
    sweet: "Every gift began with my heart. ❤️"
  },
  {
    question: "Which place did we visit for our first picnic?",
    options: ["Kotna Beach", "Somewhere in Anand", "Somewhere in Vasad", "We met in heaven and picnicked on Earth"],
    correct: 0,
    right: "Kotna Beach! I would revisit that day. 🌅",
    sweet: "Every place feels special beside you. 💗"
  },
  {
    question: "What will I bring for this anniversary?",
    options: ["This website", "We decided not to bring anything", "Amazon money to buy whatever you want", "It's a surprise"],
    correct: 3,
    right: "You guessed it: a surprise for you! 💝",
    sweet: "The best surprises arrive when you least expect them! 💝"
  }
];

let currentQuestion = 0;

const questionText = document.querySelector("#questionText");
const optionsContainer = document.querySelector("#options");
const feedback = document.querySelector("#feedback");
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");

function renderQuestion() {
  const item = questions[currentQuestion];
  progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  questionText.textContent = item.question;
  feedback.textContent = "";
  optionsContainer.replaceChildren();

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = option;
    button.addEventListener("click", () => answerQuestion(index));
    optionsContainer.appendChild(button);
  });
}

function answerQuestion(index) {
  const item = questions[currentQuestion];
  const buttons = [...optionsContainer.querySelectorAll("button")];

  buttons.forEach((button) => {
    button.disabled = true;
  });
  buttons[item.correct].classList.add("correct");

  if (index !== item.correct) {
    buttons[index].classList.add("wrong");
  }

  feedback.textContent = index === item.correct ? item.right : item.sweet;

  window.setTimeout(() => {
    if (currentQuestion < questions.length - 1) {
      currentQuestion += 1;
      renderQuestion();
    } else {
      progressText.textContent = "You remember our story";
      progressBar.style.width = "100%";
      questionText.textContent = "Every answer led us here.";
      optionsContainer.replaceChildren();
      const finalButton = document.createElement("button");
      finalButton.type = "button";
      finalButton.className = "primary-button";
      finalButton.textContent = "See the final surprise →";
      finalButton.addEventListener("click", () => {
        document.querySelector("#finale").scrollIntoView({ behavior: "smooth" });
      });
      optionsContainer.appendChild(finalButton);
    }
  }, 1200);
}

document.querySelector("#openSurprise").addEventListener("click", () => {
  document.querySelector("#memories").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#replayButton").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

renderQuestion();
