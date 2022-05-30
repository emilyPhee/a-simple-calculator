const btnKeys = document.querySelectorAll('.btn-key');
const displayText = document.querySelector('.display-text');

let displayValue = '';
let currentOperator;
let solution;

let firstNum;
let secondNum;

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
      firstNum = displayValue;
      currentOperator = clickedkeyVal;
      displayValue = '';
    }

    // check if pressed key is equal sign (enter)
    if (/=$/.test(clickedkeyVal)) {
      secondNum = displayValue;

      solution = operate(
        currentOperator,
        parseInt(firstNum),
        parseInt(secondNum)
      );

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
  if (operator === '+') {
    return add(a, b);
  } else if (operator === '-') {
    return subtract(a, b);
  } else if (operator === '*') {
    return multiply(a, b);
  } else if (operator === '/') {
    return divide(a, b);
  }
}

console.log(operate('+', 2, 7));
