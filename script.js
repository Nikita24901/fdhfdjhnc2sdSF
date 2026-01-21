const textEl = document.getElementById("text");
const buttons = document.getElementById("buttons");
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const sub = document.getElementById("sub");
const screamer = document.getElementById("screamer");
const cont = document.getElementById("continue");
const credits = document.getElementById("credits");
const black = document.getElementById("black");

const typeSound = document.getElementById("typeSound");
const scream = document.getElementById("scream");
const continueSound = document.getElementById("continueSound");

typeSound.volume = 0.2;

let speed = 60;
let typingInterval;

function typeText(text, callback) {
  clearInterval(typingInterval);
  textEl.textContent = "";
  buttons.classList.add("hidden");
  sub.classList.add("hidden");

  let i = 0;
  typingInterval = setInterval(() => {
    textEl.textContent += text[i];
    typeSound.currentTime = 0;
    typeSound.play();
    i++;

    if (i >= text.length) {
      clearInterval(typingInterval);
      if (callback) callback();
    }
  }, speed);
}

/* ЭТАП 1 */
function step1() {
  speed = 65;
  textEl.classList.remove("glitch");

  typeText("Ты думал тут что-то будет?", () => {
    buttons.classList.remove("hidden");
  });
}

noBtn.onclick = () => {
  typeText("НЕПРАВИЛЬНЫЙ ОТВЕТ.", () => {
    sub.textContent = "Попробуйте ещё раз";
    sub.classList.remove("hidden");
    buttons.classList.remove("hidden");
  });
};

yesBtn.onclick = () => step2();

/* ЭТАП 2 */
function step2() {
  speed = 55;

  typeText("Давай сыграем в игру.", () => {
    buttons.classList.remove("hidden");
  });

  noBtn.onclick = () => {
    typeText("Попробуйте ещё раз.", () => {
      buttons.classList.remove("hidden");
    });
  };

  yesBtn.onclick = () => step3();
}

/* ДИАЛОГИ */
function step3() {
  speed = 45;
  textEl.classList.add("glitch");

  const dialogs = [
    "Ты правда думаешь, что это случайно?",
    "Ты мог остановиться.",
    "Но ты продолжаешь.",
    "Ты всегда продолжаешь.",
    "Я же говорила тебе не продолжать."
  ];

  let index = 0;

  function next() {
    if (index >= dialogs.length) {
      setTimeout(showScreamer, 600);
      return;
    }

    typeText(dialogs[index], () => {
      index++;
      speed -= 5;
      setTimeout(next, 600);
    });
  }

  next();
}

/* СКРИМЕР */
function showScreamer() {
  scream.play();
  screamer.classList.remove("hidden");

  setTimeout(() => {
    screamer.classList.add("hidden");
    finalText();
  }, 2000);
}

/* ФИНАЛ */
function finalText() {
  speed = 30;
  textEl.classList.remove("glitch");

  typeText("С днём рождения.", () => {
    setTimeout(() => {
      cont.classList.remove("hidden");
      cont.classList.add("show");
    }, 5000);
  });
}

/* ПРОДОЛЖИТЬ */
cont.onclick = () => {
  continueSound.play();
  cont.classList.remove("show");
  cont.classList.add("hidden");
  textEl.textContent = "";

  black.classList.remove("hidden");

  setTimeout(() => {
    black.classList.add("hidden");
    credits.classList.remove("hidden");
  }, 2000);
};

/* СТАРТ */
step1();
