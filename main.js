// reset display on page reload
document.addEventListener("DOMContentLoaded", () => display.value = '');

/**
 * Buttons
 */

// display
let display = document.querySelector('input');
// numeric buttons 
let btnNum = document.querySelectorAll('.btn-num');
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

btnNum.forEach(function(btn){
    btn.addEventListener('click', addNum);
})

btnOper.forEach(function(btn){
    btn.addEventListener('click', addOper);
})

btnBack.addEventListener('click', back);

btnClear.addEventListener('click', clear);

btnResult.addEventListener('click', result);


/**
 * Main functions
 */

function addNum(e){
    removeResultIdAndClear();
    display.value += e.target.value;
}

function addOper(e){
    // ability to input negative numbers
    if (display.value === '' && e.target.value === '-'){
        display.value = '-';
    } else if (checkValidDisplay()){
        display.value += e.target.value;
        removeResultId();
    }
}

// add check for error on eveyr function
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
        if ((/\/0/).test(display.value)){
            display.value = 'Error';
        } else {
            try {
                display.value = eval(display.value);
            } catch(e){
                display.value = 'Error';
            }
        }
        display.setAttribute('id', 'show-result');
    }
}


/**
 * Helper and advanced behaviour functions
 */

// check if display isn't empty, the previous element isn't an operator
// and if there's an error message
function checkValidDisplay(){
    return display.value !== '' && display.value && (/\d$/).test(display.value) && !(/[a-z]/).test(display.value);
}

// After hitting the result button, pressing any number will clear the display
// this is handled creating an id of 'show-result' on the display after hitting result
// this id has to be removed when any other button besides result is pressed

// for operator, clear and back buttons
function removeResultId(){
    if (display.getAttribute('id') === 'show-result'){
        display.removeAttribute('id');
        return true;
    }
}

// for num buttons
function removeResultIdAndClear(){
    if (removeResultId()){
        display.value = '';
    }
}


/**
 * Keyboard support
 */

window.onkeydown = function(e){
    
    let btnKey = e.key;

    if (Object.values(btnOper).some(elem => elem.textContent == btnKey)){
        removeResultId();
        display.value += btnKey;
    } else if (Object.values(btnNum).some(elem => elem.textContent == btnKey)){
        removeResultIdAndClear();
        display.value += btnKey;
    }

    switch(btnKey){
        case 'Backspace':
            back();
            break;
        case 'Escape':
        case 'Delete':
            clear();
            break;
        case 'Enter':
            result();
            break;
    }
}


/**
 * TO-DO
 */

// limit nunmber input/output to display size
// only one comma on display FOR EACH NUMBER
// implement every feature on keyboard



// check if there's a mathematical operation to evaluate on display
// function checkOperation(){
//     return (/[-+*\/]/).test(display.value);
// }

//    /[-+*\/]/  use this regex to split the screen display value
// and only allow inserting a comma on the last element of the array
// if it doesn't include one already

// keyboar support
// e.key and e.target.value are the key to solve this
// try to unify this variables depending on the element that triggers the event
