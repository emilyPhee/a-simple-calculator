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

let displayCurrentValue;

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

// Clear to make it to default
clear();

function clear() {
  prevValue = '';
  currentValue = '';
  currentOperation = '';

  displayCurrentValue = '';
}

function deleteNumber() {
  currentValue = currentValue.toString().slice(0, -1);
  displayCurrentValue = currentValue;
}

function appendNumber(number) {
  if (number === '.' && currentValue.includes('.')) return;
  currentValue += number.toString();
  displayCurrentValue = currentValue;
}

function chooseOperation(operation) {
  if (currentValue === '') return;
  if (prevValue !== '') {
    compute();
  }
  currentOperation = operation;
  prevValue = currentValue;
  displayCurrentValue = currentValue;
  currentValue = '';
}

function compute() {
  if (currentOperation === '÷' && currentValue === '0') {
    alert("You can't divide by 0!");
    currentValue = '';
    displayCurrentValue = currentValue;
    return;
  }

  let computation = operate(currentOperation, prevValue, currentValue);
  prevValue = '';
  currentValue = computation;
  displayCurrentValue = currentValue;
  currentOperation = '';
}

function updateDisplay() {
  previousOperandTextElement.innerText = `${prevValue} ${currentOperation}`;
  currentOperandTextElement.innerText = displayCurrentValue;
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
      if (b === 0) {
        return null;
      } else {
        return divide(a, b);
      }

    default:
      return null;
  }
}
