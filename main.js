/**
 * Buttons
 */

// display
let display = document.querySelector('input');
// operation and numeric buttons
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

btnOper.forEach(function(btn){
    btn.addEventListener('click', addValue);
})

btnBack.addEventListener('click', back);

btnClear.addEventListener('click', clear);

btnResult.addEventListener('click', result);


/**
 * Function defintion
 */

function addValue(e){
    display.value += e.target.value;
}

function back(){
    display.value = display.value.substring(0, display.value.length -1);
}

function clear(){
    display.value = '';
}

function result(){
    try {
        display.value = eval(display.value);
    } catch(e){
        display.value = 'Error';
    }
}


/**
 * Keyboard support
 */

window.onkeydown = function(e){
    let btnKey = e.key;
    if (Object.values(btnOper).some(elem => elem.textContent == btnKey)){
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

// reset input display upon pressing any numeric button after using the result button

// function result(){
//     try {
//         display.value = eval(display.value);
//     } catch(e){
//         display.value = 'Error';
//     }
//     addClearToBtnOper();
// }

// function tempClear(e){
//     display.value = e.target.value;
//     btnOper.forEach(function(btn){
//         btn.removeEventListener('click', tempClear);
//     })
//     btnOper.forEach(function(btn){
//         btn.addEventListener('click', addValue);
//     })
// }

// function addClearToBtnOper(){
//     btnOper.forEach(function(btn){
//         btn.removeEventListener('click', addValue);
//     })
//     btnOper.forEach(function(btn){
//         btn.addEventListener('click', tempClear);
//     })
// }

// this would be a much easier approach

// function result(){
//     try {
//         display.value = eval(display.value);
//     } catch(e){
//         display.value = 'Error';
//     }
//     display.setAttribute('id', 'show-result');
// }

// function addValue(e){
//     if (display.getAttribute('id') == 'show-result'){
//         display.value = '';
//         display.removeAttribute('id');
//     }
//     display.value += e.target.value;
// }


// separate between numbers and operators
// make the addValue event only work on operators if display is not empty
// or the previous character is not an operator
// disable result button if the last character is an operator
