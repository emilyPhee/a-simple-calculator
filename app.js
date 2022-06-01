const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');

const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);
const displayText = document.querySelector('.display-text');

let displayTextVal = '';
let currentOperation = '';

// Clear to make it to default
clear();

function clear() {
  previousOperandTextElement.innerText = ' ';
  currentOperandTextElement.innerText = '0';
  displayTextVal = '';
  displayText.classList.remove('active');
}

function deleteNumber() {
  if (currentOperandTextElement.innerText.length > 1) {
    currentOperandTextElement.innerText = currentOperandTextElement.innerText
      .toString()
      .slice(0, -1);
  } else {
    clear();
  }
}

function appendNumber(number) {
  displayTextVal += number.toString();
}

function chooseOperation(operation) {
  currentOperation = operation;
}

function compute() {}

function updateDisplay() {
  currentOperandTextElement.innerText = displayTextVal;
}

// math operators
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);

    case '÷':
      return divide(a, b);

    default:
      return;
  }
}

allClearButton.addEventListener('click', () => {
  clear();
});

deleteButton.addEventListener('click', () => {
  deleteNumber();
});

numberButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const clickedNum = btn.innerText;
    appendNumber(clickedNum.toString());
    updateDisplay();

    displayText.classList.add('active');
    // console.log(currentOperation);
  });
});

operationButtons.forEach(operationBtn => {
  operationBtn.addEventListener('click', () => {
    chooseOperation(operationBtn.innerText);
  });
});
