// Basic math functions

function add(a, b) {
    return +a + +b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    if (b === 0 || b === '0') {
        return 'ZeroDivisionError';
    }
    return a / b;
};

function operate(op, x, y) {
    
    if (op === '+') {
        return add(x, y)
    } else if (op === '-') {
        return subtract(x, y) 
    } else if (op === '*') {
        return multiply(x, y)
    } else if (op === '/') {
        return divide(x, y)
    }
};

// Populating Display w/ EventListeners

const display = document.querySelector('.display');
const digits = document.querySelectorAll('.number'); 

digits.forEach((number) => {

    number.addEventListener('click', () => {

        display.textContent += number.textContent;
    })
});


const clear = document.querySelector('.clear');

clear.addEventListener('click', () => {

    display.textContent = '';
});