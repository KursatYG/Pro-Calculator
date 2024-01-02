const screen = document.getElementById("displayInput");
const buttons = document.querySelectorAll("input[type='button']");
const operations = document.getElementById("operations");

const operators = ["+", "-", "*", "/"];

displayValue = "";
screen.disabled = true;

function screenLength() {
  if (screen.value.length > 26) {
    screen.style.whiteSpace = "wrap";
  } else if (screen.value.length > 19) {
    screen.style.fontSize = "18px";
  } else if (screen.value.length > 13) {
    screen.style.fontSize = "24px";
  } else {
    screen.style.fontSize = "35px";
  }
}

function calcOperator(btn) {
  screen.value.split("")[screen.value.length - 1] = btn.value;
  const newArr = new Array(...screen.value.split(""));
  newArr[newArr.length - 1] = btn.value;
  screen.value = newArr.join("");
}

function transactionsScreen(historyElement) {
  const pastTransaction = document.createElement("div");
  pastTransaction.innerHTML = screen.value;
  historyElement.appendChild(pastTransaction);
  operations.appendChild(historyElement);
}
function resultScreen(historyElement) {
  const result = document.createElement("div");
  result.textContent = "=" + screen.value;
  historyElement.appendChild(result);
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.value == "=") {
      const historyElement = document.createElement("div");
      historyElement.classList.add("results");
      transactionsScreen(historyElement);
      screen.value = eval(screen.value);
      resultScreen(historyElement);
    } else if (btn.value == "AC") {
      screen.value = "";
    } else if (btn.value == "DEL") {
      screen.value = screen.value.slice(0, -1);
    } else if (btn.value == "%") {
      screen.value = screen.value / 100;
    } else if (btn.value == ".") {
      if (screen.value == "") {
        screen.value += "";
      } else if (!screen.value.includes(".")) {
        screen.value += ".";
      }
    } else if (operators.includes(btn.value)) {
      switch (screen.value.split("")[screen.value.length - 1]) {
        case "+":
          calcOperator(btn);
          break;
        case "-":
          calcOperator(btn);
          break;
        case "*":
          calcOperator(btn);
          break;
        case "/":
          calcOperator(btn);
          break;
        default:
          screen.value += btn.value;
          break;
      }
    } else if (screen.value.includes("N")) {
      screen.value = btn.value;
    } else {
      screen.value += btn.value;
    }
    screenLength();
  });
  // if (btn.value === "AC") {
  //   if (screen.value != "") {
  //     btn.value = "C";
  //   } else {
  //     btn.value = "AC";
  //   }
  // }
});
