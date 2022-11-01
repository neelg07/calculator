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

function checkDisplay() {
    return display.textContent.length >= 17;
}

let checkOper = false;


// Operation class object

let equation = {
    first: undefined,
    operation: undefined,
    second: undefined,
};


const display = document.querySelector('.display');
const digits = document.querySelectorAll('.number'); 

digits.forEach((number) => {                                // Number buttons

    number.addEventListener('click', () => {

        if (checkOper === true) {
            display.textContent = '';
            checkOper = false;
        }
        display.textContent += number.textContent;
    })
});



const clear = document.querySelector('.clear');            // Clear button

clear.addEventListener('click', () => {

    display.textContent = '';
});



const del = document.querySelector('.delete');           // Delete button 

del.addEventListener('click', () => {

    if (display.textContent[display.textContent.length - 1] === ' ') {                                 // If operater (' + ') delete until next non-space char
        
        display.textContent = display.textContent.substring(0, display.textContent.length - 3);
    }
    display.textContent = display.textContent.substring(0, display.textContent.length - 1);
});



const plus = document.querySelector('.add');

plus.addEventListener('click', () => {                  // Plus sign button

    equation.first = parseFloat(display.textContent);

    display.textContent += ' + ';
    checkOper = true;
});



const minus = document.querySelector('.subtract');      // Minus sign button

minus.addEventListener('click', () => {

    display.textContent += ' - ';
    checkOper = true;
});



const times = document.querySelector('.multiply');      // Multiply button

times.addEventListener('click', () => {

    display.textContent += ' * ';
    checkOper = true;
});



const division = document.querySelector('.divide');       // Division button

division.addEventListener('click', () => {

    display.textContent += ' / ';
    checkOper = true;
});



const power = document.querySelector('.exponent');          // Exponent button

power.addEventListener('click', () => {

    display.textContent += ' ^ ';
    checkOper = true;
});



const decimal = document.querySelector('.decimal');         // Decimal button

decimal.addEventListener('click', () => {

    display.textContent += '.';
    decimal.disabled = true;
});



const sign = document.querySelector('.sign');           // Change sign button

sign.addEventListener('click', () => {

    if (display.textContent[0] === '-') {
        display.textContent = display.textContent.substring(1);
    } else {
        display.textContent = '-' + display.textContent;
    }
});