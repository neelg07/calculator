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

digits.forEach((number) => {                                // Number buttons

    number.addEventListener('click', () => {

        display.textContent += number.textContent;
    })
});


const clear = document.querySelector('.clear');            // Clear button

clear.addEventListener('click', () => {

    display.textContent = '';
});


const del = document.querySelector('.delete');           // Delete button 

del.addEventListener('click', () => {

    display.textContent = display.textContent.substring(0, display.textContent.length - 1);
});


