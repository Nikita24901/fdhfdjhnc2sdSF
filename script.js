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

const pwdGame = document.getElementById("password-game");
const pwdInput = document.getElementById("password-input");
const pwdCheck = document.getElementById("pwd-check");
const pwdError = document.getElementById("pwd-error");
const hint1 = document.getElementById("hint1");
const hint2 = document.getElementById("hint2");
const img1 = document.getElementById("hint-img1");
const img2 = document.getElementById("hint-img2");
const dialogChains = {
  intro: [
    "Ты всё ещё здесь.",
    "Я думал, ты уйдёшь раньше.",
    "Обычно люди уходят.",
    "Но ты не из таких.",
    "Или тебе просто нечего делать?"
  ],

  pressure: [
    "Ты чувствуешь лёгкий дискомфорт?",
    "Он будет усиливаться.",
    "Это нормально.",
    "Ты же сам сюда пришёл.",
    "Никто тебя не звал."
  ],

  mock: [
    "Ты правда думаешь, что твои ответы важны?",
    "Они ничего не меняют.",
    "Но ты всё равно выбираешь.",
    "Интересно, почему.",
    "Привычка?"
  ],

  breakdown: [
    "На этом месте обычно смеются.",
    "Но ты не смеёшься.",
    "Ты читаешь.",
    "Значит, работает.",
    "Значит, всё не зря."
  ],

  end: [
    "Ты дошёл до конца.",
    "И ничего не получил.",
    "Кроме этого текста.",
    "Поздравляю.",
    "Тест на Эрмина пройден."
  ]
};

typeSound.volume = 0.2;

let speed = 60;
let typingInterval;

function playDialogChain(chainName, callback) {
  const dialogs = dialogChains[chainName];
  let i = 0;

  function next() {
    if (i >= dialogs.length) {
      if (callback) callback();
      return;
    }

    typeText(dialogs[i], () => {
      i++;
      setTimeout(next, 700);
    });
  }

  next();
}


/* ================= ТИПАЮЩИЙ ТЕКСТ ================= */

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

/* ================= СТАРТ ================= */

function step1() {
  speed = 65;
  typeText("Ты думал здесь что-то будет?", () => {
    buttons.classList.remove("hidden");
  });

  yesBtn.onclick = () => stepConfirm();
  noBtn.onclick = () => stepError();
}

/* ================= ВЕТКА: НЕТ ================= */

function stepError() {
  typeText("Просто ошибка?", () => {
    buttons.classList.remove("hidden");
  });

  yesBtn.onclick = () => step1();
  noBtn.onclick = () => {
    typeText("Не пизди.", () => {
      setTimeout(step1, 1200);
    });
  };
}

/* ================= ВЕТКА: ДА ================= */

function stepConfirm() {
  typeText("Ты уверен?", () => {
    buttons.classList.remove("hidden");
  });

  yesBtn.onclick = () => startPasswordGame();
  noBtn.onclick = () => {
    typeText("Не пизди.", () => {
      setTimeout(step1, 1200);
    });
  };
}

/* ================= PASSWORD ================= */

function startPasswordGame() {
  pwdGame.classList.remove("hidden");
  pwdError.classList.add("hidden");

  setTimeout(() => hint1.classList.remove("hidden"), 30000);
  setTimeout(() => hint2.classList.remove("hidden"), 90000);

hint1.onclick = () => {
  img1.classList.remove("hidden");
  setTimeout(() => {
    img1.classList.add("hidden");
  }, 3000);
};

hint2.onclick = () => {
  img2.classList.remove("hidden");
  setTimeout(() => {
    img2.classList.add("hidden");
  }, 3000);
};



  pwdCheck.onclick = () => {
    if (pwdInput.value.toLowerCase() === "усик") {
      pwdGame.classList.add("hidden");
      stepDog();
    } else {
      pwdError.classList.remove("hidden");
    }
  };
}

/* ================= ДИАЛОГИ ПО СХЕМЕ ================= */

function stepDog() {
  typeText("Илья ебёт собаку?", () => {
    buttons.classList.remove("hidden");
  });

  yesBtn.onclick = () => stepGay();
  noBtn.onclick = () => {
    typeText("Ты сам-то в это веришь?", () => {
      setTimeout(stepDog, 1200);
    });
  };
}

function stepGay() {
  typeText("Ты гей?", () => {
    buttons.classList.remove("hidden");
  });

  yesBtn.onclick = () => stepsosal();
  noBtn.onclick = () => {
    typeText("Ага. Уже понятно.", () => {
      setTimeout(stepsosal, 1200);
    });
  };
}

function stepsosal() {
  typeText("Сосал?", () => {
    buttons.classList.remove("hidden");
  });

  yesBtn.onclick = () => {
    typeText("Принято.", () => {
      setTimeout(stepLoser, 1200);;
      });
      }
  noBtn.onclick = () => {
    typeText("Не правильный ответ.", () => {
      setTimeout(stepsosal, 1200);
    });
  };
}

function stepLoser() {
  typeText("Ты лох?", () => {
    buttons.classList.remove("hidden");
  });

  yesBtn.onclick = () => stepfemboy();
  noBtn.onclick = () => {
    typeText("Мы так не договаривались.", () => {
      setTimeout(stepLoser, 1200);
    });
  };
}

function stepfemboy() {
  typeText("Ты фембойчик??", () => {
    buttons.classList.remove("hidden");
  });

  yesBtn.onclick = () => {
    typeText("Мы так и думали.", () => {
      setTimeout(finishDialogs, 1200);;
      });
      }
  noBtn.onclick = () => stepboy();
    };

  function stepboy() {
  typeText("Просто бойчик?", () => {
    buttons.classList.remove("hidden");
  });

  yesBtn.onclick = () => {
    typeText("Не понял.", () => {
      setTimeout(stepboy, 1200);;
      });
      }
  noBtn.onclick = () => finishDialogs();
    };

/* ================= ФИНАЛ ДИАЛОГОВ ================= */
function finishDialogs() {
  speed = 45;

  playDialogChain("intro", () => {
    playDialogChain("pressure", () => {
      playDialogChain("mock", () => {
        playDialogChain("breakdown", () => {
          playDialogChain("end", () => {
            setTimeout(showScreamer, 10000);
          });
        });
      });
    });
  });
}
/* ================= СКРИМЕР ================= */

function showScreamer() {
  scream.play();
  screamer.classList.remove("hidden");

  setTimeout(() => {
    screamer.classList.add("hidden");
    finalText();
  }, 2000);
}

/* ================= ПЕРЕД ТИТРАМИ ================= */

function finalText() {
  speed = 30;
  typeText("С днём рождения.", () => {
    setTimeout(() => {
      cont.classList.remove("hidden");
      cont.classList.add("show");
    }, 10000);
  });
}

/* ================= ПРОДОЛЖИТЬ ================= */

cont.onclick = () => {
  continueSound.play();
  cont.classList.remove("show");
  cont.classList.add("hidden");
  textEl.textContent = "";

  black.classList.remove("hidden");

  setTimeout(() => {
    black.classList.add("hidden");
    credits.classList.remove("hidden");
    credits.classList.add("show");
    startCreditsScroll();
    initImageColorTimers();
  }, 25000);
};

/* ================= ТИТРЫ ================= */

function startCreditsScroll() {
  const content = document.querySelector(".credits-content");
  let pos = window.innerHeight;
  const speed = 0.6;

  function scroll() {
    pos -= speed;
    content.style.transform = `translate(-50%, ${pos}px)`;
    requestAnimationFrame(scroll);
  }

  scroll();
}

function initImageColorTimers() {
  const images = document.querySelectorAll(".credits-img");

  images.forEach(img => {
    let visibleTime = 0;
    let colored = false;

    const interval = setInterval(() => {
      const rect = img.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.65 &&
        rect.bottom > window.innerHeight * 0.35;

      if (inView && !colored) {
        visibleTime += 1000;
        if (visibleTime >= 3000) {
          img.classList.add("color");
          colored = true;
          clearInterval(interval);
        }
      }
    }, 1000);
  });
}

/* ================= СТАРТ ================= */

step1();
