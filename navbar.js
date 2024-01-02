const navButtons = document.querySelectorAll(".nav-btn");
const calculatorDiv = document.querySelector(".calculator");
const calculationsDiv = document.querySelector(".calculations");
const calculatorBtn = document.getElementById("calculator");
const calculationsBtn = document.getElementById("calculations");

function activeCheck(icon) {
  navButtons.forEach((navBtn) => {
    navBtn.querySelector("i").classList.remove("active");
  });
  icon.classList.add("active");
}

toggleCalculations();
toggleCalculator();

function toggleCalculations() {
  calculationsBtn.addEventListener("click", () => {
    if ((calculationsDiv.style.display = "none")) {
      calculationsDiv.style.display = "flex";
      calculatorDiv.style.display = "none";
    }
  });
}
function toggleCalculator() {
  calculatorBtn.addEventListener("click", () => {
    if ((calculatorDiv.style.display = "none")) {
      calculationsDiv.style.display = "none";
      calculatorDiv.style.display = "block";
    }
  });
}
navButtons.forEach((nav) => {
  const icon = nav.querySelector("i");
  nav.addEventListener("click", () => {
    activeCheck(icon);
  });
});
