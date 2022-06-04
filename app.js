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

let currentOperation = '';
let prevValue = '';
let currentValue = '';

// Clear to make it to default
clear();

function clear() {}

function resetScreen() {
  currentOperandTextElement.innerText = '';
}

function deleteNumber() {
  currentValue = currentValue.toString().slice(0, -1);
}

function appendNumber(number) {
  currentValue += number.toString();
}

function chooseOperation(operation) {
  if (currentValue === '') return;
  if (prevValue !== '') {
    compute();
  } else {
    currentOperation = operation;
    prevValue = currentValue;
    currentValue = '';
  }
}

function compute() {
  // console.log('prev', prevValue);
  // console.log('current', currentValue);
  let computation = operate(currentOperation, prevValue, currentValue);
  // console.log(computation);
  prevValue = '';
  currentValue = computation;
  currentOperation = null;
}

function updateDisplay() {
  previousOperandTextElement.innerText = prevValue;
  currentOperandTextElement.innerText = currentValue;
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
  updateDisplay();
});

deleteButton.addEventListener('click', () => {
  deleteNumber();
  updateDisplay();
});

equalsButton.addEventListener('click', () => {
  compute();
  updateDisplay();
});

numberButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const clickedNum = btn.innerText;
    appendNumber(clickedNum.toString());
    updateDisplay();

    displayText.classList.add('active');
  });
});

operationButtons.forEach(operationBtn => {
  operationBtn.addEventListener('click', () => {
    chooseOperation(operationBtn.innerText);
    updateDisplay();
  });
});
