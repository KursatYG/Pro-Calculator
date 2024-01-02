const screen = document.getElementById("displayInput");
const buttons = document.querySelectorAll("input[type='button']");
const operations = document.getElementById("operations");
const operators = ["+", "-", "*", "/"];

screen.disabled = true;

function allClear() {
  const historyDivs = operations.querySelectorAll("div");
  historyDivs.forEach((div) => {
    div.remove();
  });
}

function allClearBtn() {
  const acButton = document.querySelector("input[value='AC']");
  const cButton = document.querySelector("input[value='C']");

  if (screen.value !== "") {
    acButton.setAttribute("hidden", true);
    cButton.removeAttribute("hidden");
  } else {
    cButton.setAttribute("hidden", true);
    acButton.removeAttribute("hidden");
  }
}

function screenLength() {
  const lengths = [13, 19, 26];
  const fontSizeValues = ["24px", "18px"];
  const defaultFontSize = "35px";

  let fontSize = defaultFontSize;
  for (let i = 0; i < lengths.length; i++) {
    if (screen.value.length > lengths[i]) {
      fontSize = fontSizeValues[i];
    } else {
      break;
    }
  }
  screen.style.fontSize = fontSize;
}

function calcOperator(btn) {
  screen.value = screen.value.replace(/[+\-*/]$/, btn.value);
}

function addTransactionToScreen(historyElement, content) {
  const div = document.createElement("div");
  div.textContent = content;
  historyElement.appendChild(div);
  operations.appendChild(historyElement);
  historyElement.scrollIntoView({ behavior: "smooth", block: "end" });
}

function grabResults() {
  let isDragging = false;
  let startPosition = 0;
  let startScroll = 0;

  operations.addEventListener("mousedown", (event) => {
    isDragging = true;
    startPosition = event.clientY;
    startScroll = operations.scrollTop;
    operations.style.cursor = "grabbing";
  });
  operations.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const deltaY = event.clientY - startPosition;
      operations.scrollTop = startScroll - deltaY;
    }
  });

  operations.addEventListener("mouseup", () => {
    isDragging = false;
    operations.style.cursor = "grab";
  });

  operations.addEventListener("mouseleave", () => {
    isDragging = false;
    operations.style.cursor = "grab";
  });
}

function evalFunction() {
  const historyElement = document.createElement("div");
  historyElement.classList.add("results");
  addTransactionToScreen(historyElement, screen.value);
  screen.value = eval(screen.value);
  addTransactionToScreen(historyElement, `=${screen.value}`);
}

function handleButtonClick(btn) {
  switch (btn.value) {
    case "=":
      if (!operators.includes(screen.value.slice(-1))) {
        evalFunction();
      }
      break;
    case "AC":
      allClear();
      break;
    case "C":
      screen.value = "";
      break;
    case "DEL":
      screen.value = screen.value.slice(0, -1);
      break;
    case "%":
      screen.value /= 100;
      break;
    case ".":
      if (!screen.value.includes(".")) {
        screen.value += btn.value;
      }
      break;
    default:
      if (operators.includes(btn.value)) {
        if (operators.includes(screen.value.slice(-1))) {
          calcOperator(btn);
        } else {
          screen.value += btn.value;
        }
      } else if (screen.value.includes("N")) {
        screen.value = btn.value;
      } else {
        screen.value += btn.value;
      }
      break;
  }
  allClearBtn();
  screenLength();
  grabResults();
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    handleButtonClick(btn);
  });
});
