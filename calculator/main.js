const display = document.getElementById("display")


function appendToDisplay(input){
display.value+=input
}
function clearDisplay(){
display.value=""
}
function calculate(){
    try{

        display.value=eval(display.value)
    }
    catch(error){
        display.value="Error"
    }
    
}
const OPS = "+-*/";
const isOp = (c) => OPS.includes(c);
const last = () => display.value.slice(-1);

const dotInCurrentNumber = () => {
  const tail = display.value.split(/[+\-*/]/).pop();
  return tail.includes(".");
};

function appendToDisplay(ch) {
  // Кнопка-цифра
  if (/\d/.test(ch)) {
    display.value += ch;
    return;
  }

  if (ch === ".") {
    if (!display.value || isOp(last())) {
      display.value += "0.";
      return;
    }
    if (dotInCurrentNumber()) return;
    display.value += ".";
    return;
  }

  if (isOp(ch)) {
    if (!display.value) {
      if (ch === "-") display.value = "-";
      return;
    }
    if (isOp(last())) {
      display.value = display.value.slice(0, -1) + ch;
      return;
    }
    display.value += ch;
    return;
  }
}

function calculate() {
  if (!display.value) return;

  let expr = display.value.replace(/[+\-*/]+$/g, "");

  if (!expr) return;

  try {
   if (!/^[0-9+\-*/.() ]+$/.test(expr)) throw new Error("bad input");

    const result = Function(`"use strict"; return (${expr})`)();
    display.value = Number.isFinite(result) ? String(result) : "Error";
  } catch {
    display.value = "Error";
  }
}

function clearDisplay() {
  display.value = "";
}

document.addEventListener("keydown", (e) => {
  const k = e.key;
  if (/\d/.test(k)) appendToDisplay(k);
  else if (OPS.includes(k)) appendToDisplay(k);
  else if (k === ".") appendToDisplay(".");
  else if (k === "Enter" || k === "=") calculate();
  else if (k === "Backspace") display.value = display.value.slice(0, -1);
});
