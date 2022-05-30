const btnKeys = document.querySelectorAll('.btn-key');
const displayText = document.querySelector('.display-text');

let displayValue = '';
let currentOperator;
let prevOperator;

let solution;

let firstNum;
let secondNum;

let calculateCounter = 0;

btnKeys.forEach(key => {
  key.addEventListener('click', () => {
    const clickedkeyVal = key.innerText;

    // check if pressed key is number
    if (/^\d+$/.test(clickedkeyVal) || clickedkeyVal === '.') {
      displayText.classList.add('active');
      displayValue += clickedkeyVal;
      if (displayValue.length < 110) {
        displayText.innerText = displayValue;
      }
    }

    // check if pressed key is operator
    if (/(\+|-|\*|\/)$/.test(clickedkeyVal)) {
      calculateCounter++;
      prevOperator = clickedkeyVal;

      if (calculateCounter > 1) {
        currentOperator = clickedkeyVal;
        secondNum = displayValue;
        console.log('first', firstNum);
        console.log('second', secondNum);
        firstNum = operate(prevOperator, firstNum, secondNum);

        console.log('first num', firstNum);
        calculateCounter = 0;
        displayValue = '';
      } else {
        firstNum = displayValue;
        currentOperator = clickedkeyVal;
        displayValue = '';

        console.log(calculateCounter);
      }
    }

    // check if pressed key is equal sign (enter)
    if (/=$/.test(clickedkeyVal)) {
      secondNum = displayValue;

      solution = operate(currentOperator, firstNum, secondNum);

      displayText.innerText = solution;
    }
  });
});

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

    case '/':
      return divide(a, b);
  }
}

console.log(operate('+', 2, 7));
