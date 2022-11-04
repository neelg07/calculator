// Basic math functions

function add(a, b) {
    let soln = parseFloat(a) + parseFloat(b);
    
    if (soln.toString().length >= 17) {
        soln = soln.toPrecision(9);                     // If answer too long, round to 9 decimal places
        return parseFloat(soln);
    } else {
        return soln;
    }
};

function subtract(a, b) {
    let soln = a - b;

    if (soln.toString().length >= 17) {
        soln = soln.toPrecision(9);
        return parseFloat(soln);
    } else {
        return soln;
    }
};

function multiply(a, b) {
    let soln = a * b;

    if (soln.toString().length >= 17) {
        soln = soln.toPrecision(9);
        return parseFloat(soln);
    } else {
        return soln;
    }
};

function divide(a, b) {
    if (b === 0 || b === '0') {
        return 'ZeroDivisionError';
    }
    let soln = a / b;

    if (soln.toString().length >= 17) {
        soln = soln.toPrecision(9);
        return parseFloat(soln);
    } else {
        return soln;
    }
};

function exponent(a, b) {
    let soln = Math.pow(a, b);

    if (soln.toString().length >= 17) {
        soln = soln.toPrecision(9);
        return parseFloat(soln);
    } else {
        return soln;
    }
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
    } else if (op === '^') {
        return exponent(x, y)
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
    equal: false,
    
};


function clearAttribute() {                                 // removes 'clicked' effect on operators & raw data

    raw.textContent = '--';

    equation.first = undefined;                            // reset display and equation class properties
    equation.second = undefined; 
    equation.addition = false;
    equation.subtraction = false;
    equation.multiplication = false;
    equation.division = false;
    equation.power = false;
    equation.equal = false;
    
    decimal.disabled = false;

    plus.removeAttribute('style');
    minus.removeAttribute('style');
    times.removeAttribute('style');
    division.removeAttribute('style');
    power.removeAttribute('style');
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

            
            // If number key is pressed right after operator button

            if (equation.addition) {                   // Addition operator
                plus.removeAttribute('style');

                if (!equation.second && display.textContent !== '-' && display.textContent !== '.') {                             // for 2 or more plus sign clicks
                    display.textContent = '';
                }
            }

            if (equation.subtraction) {                 // Subtract operator
                minus.removeAttribute('style');

                if (!equation.second && display.textContent !== '-' && display.textContent !== '.') {
                    display.textContent = '';
                }
            }

            if (equation.multiplication) {          // Multiply operator
                times.removeAttribute('style');

                if (!equation.second && display.textContent !== '-' && display.textContent !== '.') {
                    display.textContent = '';
                }
            }

            if (equation.division) {                    // division operator
                division.removeAttribute('style');

                if (!equation.second && display.textContent !== '-' && display.textContent !== '.') {
                    display.textContent = '';
                }
            }

            if (equation.power) {                       // exponent operator
                power.removeAttribute('style');

                if (!equation.second && display.textContent !== '-' && display.textContent !== '.') {
                    display.textContent = '';
                }
            }

            if (equation.equal && display.textContent) {            // Number input resets display right after equal sign operation
                display.textContent = '';
                equation.equal = false;
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
    clearAttribute();

});



const del = document.querySelector('.delete');           // Delete button 

del.addEventListener('click', () => {

    if (display.textContent === '') {
        clearAttribute();
    } else if (equation.first === NaN) {
        equation.first = undefined;
    } else if (equation.second = NaN) {
        equation.second = undefined;
    } else {
        display.textContent = display.textContent.substring(0, display.textContent.length - 1);
        updateEquation();
    }

});



const plus = document.querySelector('.add');

plus.addEventListener('click', () => {                  // Plus sign button

    decimal.disabled = false;

    if ((equation.subtraction || equation.multiplication || equation.division || equation.power) && equation.second) {              // switching operations b4 solving
        equal();
        display.textContent = equation.first;
    }

    minus.removeAttribute('style');                 // remove data from other operators
    equation.subtraction = false;
    times.removeAttribute('style');
    equation.multiplication = false;
    division.removeAttribute('style');
    equation.division = false;
    power.removeAttribute('style');
    equation.power = false;
    equation.equal = false; 

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

    decimal.disabled = false;

    if ((equation.addition || equation.multiplication || equation.division || equation.power) && equation.second) {          //switching operations
        equal();
        display.textContent = equation.first;
    } 

    plus.removeAttribute('style');                             // remove data from other operators
    equation.addition = false;
    times.removeAttribute('style');
    equation.multiplication = false;
    division.removeAttribute('style');
    equation.division = false;
    power.removeAttribute('style');
    equation.power = false;
    equation.equal = false; 

    if ((equation.first || equation.first === 0) && !equation.subtraction) {          // First consecutive minus sign click
        minus.setAttribute('style', 'background: gray;');
        equation.subtraction = true;
        display.textContent = '';
        raw.textContent = equation.first + ' - ';
    }

    if ((equation.first || equation.first === 0) && equation.second && equation.subtraction) {        // consecutive minus operations
        minus.setAttribute('style', 'background: gray;');
        equal();
        equation.subtraction = true;
        raw.textContent = equation.first + ' - ';
    }

});




const times = document.querySelector('.multiply');      // Multiply button

times.addEventListener('click', () => {

    decimal.disabled = false;

    if ((equation.addition || equation.subtraction || equation.division || equation.power) && equation.second) {
        equal();
        display.textContent = equation.first;
    }

    plus.removeAttribute('style');
    equation.addition = false;
    minus.removeAttribute('style');
    equation.subtraction = false;
    division.removeAttribute('style');
    equation.division = false;
    power.removeAttribute('style');
    equation.power = false;
    equation.equal = false;

    if ((equation.first || equation.first === 0) && !equation.multiplication) {
        times.setAttribute('style', 'background: gray;');
        equation.multiplication = true;
        display.textContent = '';
        raw.textContent = equation.first + ' * ';
    }

    if ((equation.first || equation.first === 0) && equation.second && equation.multiplication) {
        times.setAttribute('style', 'background: gray;');
        equal();
        equation.multiplication = true;
        raw.textContent = equation.first + ' * ';
    }

});



const division = document.querySelector('.divide');       // Division button

division.addEventListener('click', () => {

    decimal.disabled = false; 

    if ((equation.addition || equation.subtraction || equation.multiplication || equation.power) && equation.second) {
        equal();
        display.textContent = equation.first;
    }

    plus.removeAttribute('style');
    equation.addition = false;
    minus.removeAttribute('style');
    equation.subtraction = false;
    times.removeAttribute('style');
    equation.multiplication = false;
    power.removeAttribute('style');
    equation.power = false;
    equation.equal = false;

    if ((equation.first || equation.first === 0) && !equation.division) {
        division.setAttribute('style', 'background: gray;');
        equation.division = true;
        display.textContent = '';
        raw.textContent = equation.first + ' / ';
    }

    if ((equation.first || equation.first === 0) && equation.second && equation.division) {
        division.setAttribute('style', 'background: gray;');
        equal();
        equation.division = true;
        raw.textContent = equation.first + ' / ';
    }

});




const power = document.querySelector('.exponent');          // Exponent button

power.addEventListener('click', () => {

    decimal.disabled = false;

    if ((equation.addition || equation.subtraction || equation.multiplication || equation.division) && equation.second) {
        equal();
        display.textContent = equation.first;
    }

    plus.removeAttribute('style');
    equation.addition = false;
    minus.removeAttribute('style');
    equation.subtraction = false;
    times.removeAttribute('style');
    equation.multiplication = false;
    division.removeAttribute('style');
    equation.division = false;
    equation.equal = false;

    if ((equation.first || equation.first === 0) && !equation.power) {
        power.setAttribute('style', 'background: gray;');
        equation.power = true;
        display.textContent = '';
        raw.textContent = equation.first + '^';
    }

    if ((equation.first || equation.first === 0) && equation.second && equation.power) {
        power.setAttribute('style', 'background: gray;');
        equal();
        equation.power = true;
        raw.textContent = equation.power + '^';
    }
    
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
        updateEquation();
    } else {

        (display.textContent === '0') ? display.textContent = '-' : 
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

    if (equation.multiplication) {                                              // multiplying 

        raw.textContent = equation.first + ' * ' + equation.second;
        equation.first = operate('*', equation.first, equation.second);
        equation.second = undefined;
        equation.multiplication = false;
        display.textContent = equation.first;
    }

    if (equation.division) {                                                    // division

        raw.textContent = equation.first + ' / ' + equation.second;
        equation.first = operate('/', equation.first, equation.second);
        equation.second = undefined;
        equation.division = false;
        display.textContent = equation.first;
    }

    if (equation.power) {                                                 // raise to power

        raw.textContent = equation.first + '^' + equation.second;
        equation.first = operate('^', equation.first, equation.second);
        equation.second = undefined;
        equation.power = false;
        display.textContent = equation.first;
    }

    decimal.disabled = false;
    equation.equal = true;

};

const equalSign = document.querySelector('.equal');             // Equal sign button

equalSign.addEventListener('click', equal);


// Keyboard inputs

const zero = document.getElementById('0');
const one = document.getElementById('1');
const two = document.getElementById('2');
const three = document.getElementById('3');
const four = document.getElementById('4');
const five = document.getElementById('5');
const six = document.getElementById('6');
const seven = document.getElementById('7');
const eight = document.getElementById('8');
const nine = document.getElementById('9');

document.addEventListener('keydown', function(event) {

    equalSign.focus();

    switch (event.key) {
        // Number keys
        case '0':
            zero.click();
            break;
        case '1': 
            one.click();
            break;
        case '2':
            two.click();
            break;
        case '3':
            three.click();
            break;
        case '4':
            four.click();
            break;
        case '5':
            five.click();
            break;
        case '6':
            six.click();
            break;
        case "7":
            seven.click();
            break;
        case '8':
            eight.click();
            break;
        case '9':
            nine.click();
            break;

        // Operators
        case "+":
            plus.click();
            break;

        case '-':
            (display.textContent === '' || display.textContent === '0') ? sign.click() : minus.click();
            break;

        case '*':
            times.click();
            break;
        case '/':
            division.click();
            break;
        case '^':
            power.click();
            break;

        // Misc
        case '.':
            decimal.click();
            break;
        case '=':
            equalSign.click();
            break;
        case 'Enter':
            equalSign.click();
            break;
        case 'Backspace':
            del.click();
            break;
        
    }
});