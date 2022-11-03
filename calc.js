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

// Operation class object

let equation = {

    first: undefined,
    second: undefined,

    addition: false,
    subtraction: false,
    multiplication: false,
    division: false,
    power: false,
    
};


function clearAttribute() {                                 // removes 'clicked' effect on operators

    plus.removeAttribute('style');
    minus.removeAttribute('style');
}



function updateEquation() {
    
    if (equation.addition === false &&
        equation.subtraction === false &&
        equation.multiplication === false && 
        equation.division === false && 
        equation.power === false) {

            equation.first = parseFloat(display.textContent);
        } else {

            equation.second = parseFloat(display.textContent);
        }
};


const display = document.querySelector('.main-data');           // main data and raw data display
const raw = document.querySelector('.raw-data');

const digits = document.querySelectorAll('.number'); 

digits.forEach((number) => {                                // Number buttons

    number.addEventListener('click', () => {

        if (display.textContent.length >= 19) {             // Do not let display exceed 19 char spaces
            alert('Too many numbers');
        }



        if (display.textContent.length < 19) {


            if (equation.addition) {                   // Add operator
                plus.removeAttribute('style');

                if (!equation.second) {                             // for 2 or more plus sign clicks
                    display.textContent = '';
                }
            }

            if (equation.subtraction) {                 // Subtract operator
                minus.removeAttribute('style');

                if (!equation.second) {
                    display.textContent = '';
                }
            }


            if (display.textContent === '0') {                          // Update display properly if changing from '0'
                display.textContent = number.textContent;
            } else {
                display.textContent += number.textContent;
            }
            updateEquation();

        }

    })
});



const clear = document.querySelector('.clear');            // Clear button

clear.addEventListener('click', () => {

    display.textContent = '';

    equation.first = undefined;                            // reset display and equation class properties
    equation.second = undefined; 
    equation.addition = false;
    equation.subtraction = false;
    equation.multiplication = false;
    equation.division = false;
    equation.power = false;

    clearAttribute();
});



const del = document.querySelector('.delete');           // Delete button 

del.addEventListener('click', () => {

    display.textContent = display.textContent.substring(0, display.textContent.length - 1);
});



const plus = document.querySelector('.add');

plus.addEventListener('click', () => {                  // Plus sign button

    if (equation.subtraction || equation.multiplication || equation.division || equation.power) {              // switching operations b4 solving
        equal();
        display.textContent = equation.first;
    }

    minus.removeAttribute('style');                 // remove data from other operators
    equation.subtraction = false;

    if ((equation.first || equation.first === 0) && !equation.addition) {                   // Pressing before second operand input
        plus.setAttribute('style', 'background: gray;');
        equation.addition = true;
        display.textContent = '';
        raw.textContent = equation.first + ' + ';
    }

    if ((equation.first || equation.first === 0) && equation.second && equation.addition) {       // Pressing >once to perform equal operation
        plus.setAttribute('style', 'background: gray;');
        equal();
        equation.addition = true;
        raw.textContent = equation.first + ' + ';
    }

});



const minus = document.querySelector('.subtract');      // Minus sign button

minus.addEventListener('click', () => {

    if (equation.addition || equation.multiplication || equation.division || equation.power) {          //switching operations
        equal();
        display.textContent = equation.first;
    }

    plus.removeAttribute('style');                             // remove data from other operators
    equation.addition = false;  

    if ((equation.first || equation.first === 0) && !equation.subtraction) {          // First consecutive minus sign click
        minus.setAttribute('style', 'background: gray;');
        equation.subtraction = true;
        display.textContent = '';
    }

    if ((equation.first || equation.first === 0) && equation.second && equation.subtraction) {        // consecutive minus operations
        minus.setAttribute('style', 'background: gray;');
        equal();
        equation.subtraction = true;
    }

});

/*

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

*/

const sign = document.querySelector('.sign');           // Change sign button

sign.addEventListener('click', () => {

    if (display.textContent[0] === '-') {
        display.textContent = display.textContent.substring(1);
        updateEquation();
    } else {
        display.textContent = '-' + display.textContent;
        updateEquation();
    }
});



function equal() {

    if (equation.addition) {                                                    // For addition

        raw.textContent = equation.first + ' + ' + equation.second;
        equation.first = operate('+', equation.first, equation.second);
        equation.second = undefined;
        equation.addition = false;
        display.textContent = equation.first;
    }

    if (equation.subtraction) {                                           // For subtraction

        raw.textContent = equation.first + ' - ' + equation.second;
        equation.first = operate('-', equation.first, equation.second);
        equation.second = undefined;
        equation.subtraction = false;
        display.textContent = equation.first;
    }
};

const equalSign = document.querySelector('.equal');             // Equal sign button

equalSign.addEventListener('click', equal);