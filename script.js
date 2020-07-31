/* try to code using inheritance next time*/
/* todo: computations history */
/* todo: continious computations 3+2*3 - done*/
/* todo: float nums approximation 7.1 *3 = 21.29999999997 */
/* todo: support negative nums */
/* plus two buttons: minus and history */

/*  add classes to inputs, use classes for js 
*   check eval(), assign all dom elements at the beginning,
*   placeholder attr instead of value attr in input element
*
*/
"use strict"
function Calculator() {
  this.prevOperand = '';
  this.curOperand = '';
  this.method = null;
  //this.displayNode  = document.querySelector()
  this.binaryOperator = 'true';
  
  this.updateView = function(char) { // divide into two functions: appendOp and updateDisplay
    if(char == '.' && this.curOperand.includes('.'))
      return;
    if(this.curOperand.length >= 15)
      return;
    
    this.curOperand += char;
    expressionNode.textContent += char;  
  };
  
  this.operator = function(func) {
    if(this.curOperand == '')
      return;

    this.binaryOperator = true;

    if(event.target.value == '!') {
      this.binaryOperator = false;
    }
    if(this.prevOperand != '') {
      if(this.binaryOperator)
        this.operate();
      else { // unary operator handler ...
        this.operate();
        this.method = this[func]();
        this.prevOperand = this.curOperand;
        this.curOperand = '';
        expressionNode.textContent += event.target.value;
        this.operateUn();
        return;
      }
    }

    this.prevOperand = this.curOperand;
    this.curOperand = '';

    expressionNode.textContent += event.target.value;
    this.method = this[func](); // func = event.target.name
  }

  this.operate = function() {
    if(this.curOperand == '' || this.prevOperand == '') 
      return;
    const cur = Number(this.curOperand); 
    const prev = Number(this.prevOperand);
    let res = this.method(prev, cur);
    this.curOperand = `${res}`;
    if(res.toString().length >= 15)
      res = res.toPrecision(5);
    this.prevOperand = '';  
    this.method = null;
    resultNode.textContent = ` = ${res}`;
    //expressionNode.textContent = ' ';   
  }

  this.operateUn = function() {
    const prev = Number(this.prevOperand);
    const res = this.method(prev);
    this.curOperand = `${res}`;
    this.prevOperand = '';
    this.method = null; 
    resultNode.textContent = ` = ${res}`;
  }
  this.updateResult = function(){
    expressionNode.textContent = this.curOperand;
  } 
  this.clear = function() {
    this.prevOperand = '';
    this.curOperand = '';
    expressionNode.textContent = '';
    resultNode.textContent = '0';
    this.method = null;
  }

  this.backspace = function() {
    if(this.curOperand == '' || expressionNode.textContent == '')
      return;
    this.curOperand = this.curOperand.slice(0, -1);
    expressionNode.textContent = expressionNode.textContent.slice(0, -1);
  }

  this.sum = function () {
    return function(a, b) {
      return a+b;
    }
  }

  this.div = function () {
    return function(a, b) {
      return a / b;
    }
  }

  this.sub = function () {
    return function(a, b) {
      return a - b;
    }
  }

  this.mul = function() {
   return function (a, b) {
     return a * b; 
   }
  }
  
  this.pow = function () {
    return function(a, b) {
      return Math.pow(a, b);
    }
  }

  this.mod = function () {
    return function(a, b) {
      return Number.prototype.mod(a, b);
    }
  }

  this.fact = function () {
    function f(a) {
      if(a == 0)
        return 1;
      return a*f(a-1);
    }
    return f;
  }
}

  
Number.prototype.mod = function(a, b) {
  return ((a % b) + b) % b;
};

let calc = new Calculator();

const digits = document.querySelectorAll('.digits'),
      operators = document.querySelectorAll('.operators'),
      resultNode = document.querySelector('.result'),
      expressionNode = document.querySelector('.expression'),
      equalNode = document.querySelector('.equal'),
      clearNode = document.querySelector('.clear'),
      backspaceNode = document.querySelector('.backspace');

for(const digitsElem of digits)
  digitsElem.addEventListener('click', () => calc.updateView(digitsElem.value));
for(const operatorsElem of operators)
  operatorsElem.addEventListener('click', () => calc.operator(operatorsElem.name));
 
equalNode.addEventListener('click', () => { 
  if(calc.binaryOperator) 
    calc.operate(); 
  else 
    calc.operateUn();
  calc.updateResult();
  });  
clearNode.addEventListener('click', () => calc.clear());
backspaceNode.addEventListener('click', () => calc.backspace());
