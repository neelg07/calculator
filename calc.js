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

        if (display.textContent.length >= 19) {
            alert('Too many numbers');
        } else {

            if (checkOper) {
                display.textContent = number.textContent;
                plus.removeAttribute('style');
                checkOper = false;
                equation.second = parseFloat(display.textContent);
            } else if (equation.first) {
                display.textContent += number.textContent;
                equation.second = parseFloat(display.textContent);
            } else {
                display.textContent += number.textContent;
            }
            
        }
    })
});



const clear = document.querySelector('.clear');            // Clear button

clear.addEventListener('click', () => {

    display.textContent = '';

    equation.first = undefined;
    equation.operation = undefined;
    equation.second = undefined; 
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

        plus.setAttribute('style', 'background: gray;');
        equation.operation = '+';
        checkOper = true;

        if (equation.second === undefined) {
            equation.first = parseFloat(display.textContent);
        } else {
            equation.first = equal();
            display.textContent = equation.first;
        }

});

/*

const minus = document.querySelector('.subtract');      // Minus sign button

minus.addEventListener('click', () => {

    display.textContent += ' - ';
    checkOper = true;
});



const times = document.querySelector('.multiply');      // Multiply button

times.addEventListener('click', () => {

    display.textContent += ' * ';

});



const division = document.querySelector('.divide');       // Division button

division.addEventListener('click', () => {

    display.textContent += ' / ';

});



const power = document.querySelector('.exponent');          // Exponent button

power.addEventListener('click', () => {

    display.textContent += ' ^ ';
    
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

*/

function equal() {


    if (equation.operation === '+' && equation.second) {
        equation.first = operate(equation.operation, equation.first, equation.second)
        display.textContent = equation.first;
        equation.second = undefined;
        return equation.first;
    } else if (equation.operation === '+' && !equation.second) {
        return display.textContent;
    }
};

const equalSign = document.querySelector('.equal');             // Equal sign button

equalSign.addEventListener('click', equal);