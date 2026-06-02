//Basic operations
function add(a, b){
    return a+b;
}

function subtract(a, b){
    return a-b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    if(b === 0){
        alert('You cannot divide by 0');
        return "Error";
    }
    return a/b;
}

function operate(operator, a, b){
    a = Number(a);
    b = Number(b);

    switch(operator){
        case "+":
            return add(a,b);
            break;
        case "-":
            return subtract(a,b);
            break;
        case "X":
            return multiply(a,b);
            break;
        case "/":
            return divide(a,b);
            break;
        default:
            return null;
    }
}

//State variables
let firstNumber = '';
let secondNumber = '';
let operator = null;
let currentInput = '';
let shouldResetScreen = false;

const currentDisplay = document.querySelector('.current');
const previousDisplay = document.querySelector('.previous');

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');
const floatButton = document.querySelector('.float');

//Update the screen
function updateDisplay(){
    currentDisplay.textContent = currentInput;

    if(operator){ //If there's an operator, it shows the number and the operator in the upper side
        previousDisplay.textContent = `${firstNumber} ${operator}`;
    } else { //Else, it'll show nothing
        previousDisplay.textContent = '';
    }
}

// Numbers
numberButtons.forEach(button => {
    // For each button, we add an event listener
    button.addEventListener("click", () => {
        if(shouldResetScreen){ //Helps to know if we are putting another number after an operator
            currentInput = '';
            shouldResetScreen = false;
        }
        // Else, it'll concatenate numbers before said operator
        currentInput += button.textContent;
        updateDisplay();
    });
});

//Operators
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        // If there's no numbers in the display, it'll write no operator
        if(currentInput === '') return;

        if(operator !== null){
            //After an operator is pressed, it'll wait for us to write another number and have the operation
            //on stand-by until we click another operator
            secondNumber = currentInput;

            currentInput = operate(
            operator,
            firstNumber, 
            secondNumber
        ).toString();

        //Showing the result
        firstNumber = currentInput;
        } else {
            firstNumber = currentInput
        }

        operator = button.textContent;
        shouldResetScreen = true; //sets this to true so we can write another number

        updateDisplay();
    });
});

// Equal button
equalButton.addEventListener("click", () => {
    if(operator === null || currentInput === ''){ // If there's nothing, nothing will happen
        return;
    }

    secondNumber = currentInput;

    let result = operate(operator, firstNumber, secondNumber)
    currentInput = result.toString();

    firstNumber = '';
    secondNumber = '';
    operator = null;

    updateDisplay();
})

// Float
floatButton.addEventListener("click", () => {
    if(shouldResetScreen){
        currentInput = "0";
        shouldResetScreen = false;
    }

    if(!currentInput.includes(".")){
        currentInput += ".";
    }

    updateDisplay();
})

// Clear screen
clearButton.addEventListener("click", () => {
    // Just set everything tho default
    currentInput = '';
    firstNumber = '';
    secondNumber = '';
    operator = null;
    shouldResetScreen = false;

    updateDisplay();
});


updateDisplay();

