const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = null;
let previousInput = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculate();
        } else if (['+', '-', '*', '/'].includes(value)) {
            setOperator(value);
        } else {
            appendNumber(value);
        }
    });
});

function clearDisplay() {
    currentInput = '0';
    operator = null;
    previousInput = null;
    updateDisplay();
}

function calculate() {
    if (operator && previousInput !== null) {
        let result;
        switch (operator) {
            case '+':
                result = parseFloat(previousInput) + parseFloat(currentInput);
                break;
            case '-':
                result = parseFloat(previousInput) - parseFloat(currentInput);
                break;
            case '*':
                result = parseFloat(previousInput) * parseFloat(currentInput);
                break;
            case '/':
                result = parseFloat(previousInput) / parseFloat(currentInput);
                break;
        }
        currentInput = result.toString();
        operator = null;
        previousInput = null;
        updateDisplay();
    }
}

function setOperator(op) {
    if (operator !== null) {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '0';
}

function appendNumber(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function updateDisplay() {
    display.innerText = currentInput;
}
