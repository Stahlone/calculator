// reset display on page reload
document.addEventListener("DOMContentLoaded", () => display.value = '');

/**
 * Buttons
 */

// display
let display = document.getElementById('screen');
// numeric buttons 
let btnNum = document.querySelectorAll('.btn-num');
// comma
let btnComma = document.getElementById('btn-comma');
// operator buttons
let btnOper = document.querySelectorAll('.btn-op');
// back
let btnBack = document.getElementById('btn-back');
// clear
let btnClear = document.getElementById('btn-clear');
// result 
let btnResult = document.getElementById('btn-result');


/**
 * Listeners
 */

btnNum.forEach(btn => btn.addEventListener('click', addNum));

btnComma.addEventListener('click', addComma);

btnOper.forEach(btn => btn.addEventListener('click', addOper));

btnBack.addEventListener('click', back);

btnClear.addEventListener('click', clear);

btnResult.addEventListener('click', result);


/**
 * Main functions
 */

function addNum(e){
    let inputVal = e.key || e.target.value;
    removeResultIdAndClear();
    let displayNumbers = display.value.split(/[-+*\/]/);
    // prevents inserting zeroes before a positive integer
    // or multiple zeroes before a comma
    // avoid possible parsing errors when converting numbers with
    // leading zeroes into octal numbers
    if (!displayNumbers[displayNumbers.length - 1].endsWith('0')){
        display.value += inputVal;
    } else if (displayNumbers[displayNumbers.length - 1].length >= 2){
        display.value += inputVal;
    }
}

function addComma(e){
    let inputVal = e.key || e.target.value;
    removeResultIdAndClear();
    // prevents more than one instance of '.' on a number
    let displayNumbers = display.value.split(/[-+*\/]/);
    if (!displayNumbers[displayNumbers.length - 1].includes('.')){
        display.value += inputVal;
    }
}

function addOper(e){
    let inputVal = e.key || e.target.value;
    // ability to operate with negative numbers
    if (!display.value.endsWith('-') && inputVal === '-'){
        display.value += inputVal;
        removeResultId();
    } else if (checkValidDisplay()){
        display.value += inputVal;
        removeResultId();
    }
}

function back(){
    if (display.value !== 'Error'){
        display.value = display.value.substring(0, display.value.length -1);
        removeResultId();
    }
}

function clear(){
    display.value = '';
    removeResultId();
}

function result(){
    if (checkValidDisplay()){
        let check = eval(display.value);
        // check for any division by zero
        if (check === Infinity || check === -Infinity || isNaN(check)){
            display.value = 'Error';
        } else if (check.toString().length > 8) {
            display.value = expo(check, 6);
        } else {
            display.value = check;
        }
        // class needed to clear result display upon pressing a number
        display.setAttribute('class', 'show-result');
    }
}


/**
 * Helper and advanced behaviour functions
 */

// check if display isn't empty, the previous element isn't an operator
// and if there's an error message
function checkValidDisplay(){
    return display.value !== '' && (/[0-9.]$/).test(display.value) && display.value !== 'Error';
}

// After hitting the result button, pressing any number will clear the display
// this is handled creating a class of 'show-result' on the display after hitting result
// this id has to be removed when any other button besides result is pressed

// for operator, clear and back buttons
function removeResultId(){
    if (display.getAttribute('class') === 'show-result'){
        display.removeAttribute('class');
        return true;
    }
}

// for num buttons
function removeResultIdAndClear(){
    if (removeResultId()){
        display.value = '';
    }
}

// for the result button, limits length of result output 
// displaying longer numbers as exponentials
function expo(x, f) {
    return Number.parseFloat(x).toExponential(f);
}
  

/**
 * Keyboard support
 */

window.onkeydown = function(e){
    
    let btnKey = e.key;

    // check if the key pressed corresponds to a button number
    if (Object.values(btnNum).some(elem => elem.textContent == btnKey)){
        addNum(e);
    }
    // check if the key pressed corresponds to a button operator
    if (Object.values(btnOper).some(elem => elem.textContent == btnKey)){
        addOper(e);
    }
    // handle the rest of possible operations
    switch(btnKey){
        case '.':
            addComma(e);
            break;
        case 'Backspace':
            back();
            break;
        case 'Escape':
        case 'Delete':
            clear();
            break;
        case 'Enter':
        case '=':
            result();
            break;
    }
}


/**
 * TO-DO
 * 
 *  limit nunmber input/output to display size
 *  get left overflow working (direction rtl fix)
 *  
 *  create a message display screen
 *  to provide feedback upon error
 *  and feeback to the user when the result key is not 
 *  working due to an invalid operation on screen
 * 
 *  display exponential numbers as '*10 <sup>x</sup>'
 *
 *  make keyboard input trigger button press 'animation'
 * 
 *  overall refactor and cleaning of the code
 * 
 */

/**
 * Known bugs
 * 
 *  Sometimes when switching from button to keyboard input, the enter/equal key
 *  won't trigger the result function correctly
 */
