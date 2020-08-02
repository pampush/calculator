/* using objects for stack and queues is excessive 
*
*/
"use strict"
/* let stack = {
  size: 0,
  top: null,
  push: function(data) {
    let node = new Node(data);
    this.size++;
    node.previous = this.top;
    this.top = node;
    return node;
  },
  pop: function() {
    if(!this.top){
      console.log("ok");
      return;}
    this.top = this.top.previous;
    this.size--;
    return this.top;
  }
};

function Node(data) {
  this.data = data;
  this.previous = null;
} */


function Queue() {
  this.s1 = [];
  this.s2 = [];
  this.enqueue = function(data){
    if(Array.isArray(data))
      for(const item of data)
        this.s1.push(item);
    else
      this.s1.push(data);
        
    
    
  };
  this.enqueueBegin = function(data){
    if(Array.isArray(data))
      for(const item of data)
        this.s2.push(item);
    else
      this.s2.push(data);
  };
  this.dequeue = function(){
    if(this.s2.length == 0)
      _move.call(this);
    return this.s2.pop();
  };

  function _move() {
    while(this.s1.length)
      this.s2.push(this.s1.pop());
  };

  this.getItem = function(){
    if(s1.length)
      return this.s1[0];
    else
      return this.s2[this.s2.length-1];
  }

  this.isEmpty = function() {
    return !(this.s1.length  || this.s2.length);
  }
  this.clear = function() {
    while(this.s1.length)
      this.s1.pop();
    while(this.s2.length)
      this.s2.pop();
  }
}

/* let operands = new Queue();
let  operators = new Queue();
operands.enqueue(2,2,3);
operators.enqueue('+', '*'); */

let calc = {
  operators: new Queue(),
  operands: new Queue(),
  curOperand: '',
  prevOperand: '', 
  expression: '',
  method: null,
  log: [],
  operate: function() {
    let res = 0;
    while(!calc.operators.isEmpty()){
      const a = Number(calc.operands.dequeue());
      const b = Number(calc.operands.dequeue());
      const op = calc.operators.dequeue();
      res = this[op](a, b);
      calc.operands.enqueueBegin(res);
    }
    resultNode.textContent = `= ${res}`;
    this.log.push(this.expression + '=' + res);
    this.expression = `${res}`;
    expressionNode.textContent = this.expression;
    calc.operands.clear();
    calc.operators.clear();
  },

  '+': function(a, b) {
    return a+b;
  },
  '-': function(a, b) {
    return a-b;
  },
  'x': function(a, b) {
    return a*b;
  },
  '/': function(a, b) {
    return a/b;
  },
  appendDigit: function(char) {
    if(char == '.' && (this.curOperand.includes('.')  || this.curOperand == '')) // prevent leading '.' and multiple '.'
      return;
    if(this.curOperand[0] == '0' && Number.isInteger(Number(char)) && !this.curOperand.includes('.') ) // prevent leading zeros  
      return;
    if(this.curOperand.length >= 15) 
      return;
    
    this.curOperand += char;
    this.expression += char;
    expressionNode.textContent += char;
  },
  addOperator: function(char) {
    if(this.curOperand == ''){
      this.operator = '';
      return;
    }
    this.prevOperand = this.curOperand;
    this.curOperand = '';
    this.expression += char;
    expressionNode.textContent += char;
  },

  parseString: function() {
    this.operators.enqueue(calc.expression.match(/[^\.\d]/g)); 
    this.operands.enqueue(calc.expression.match(/\d+(\.\d+)?/g))
  },
  validateOperand: function(char) { // leading zeros problem
    this.expression += char;
    let arr = this.expression.match(/\d+(\.\d+)?/g); // 1.12 valid num
    let exc1 = this.expression.match(/\.\./g);
    let exc2 = this.expression.match(/\d+\.\d+\./); // 1.2.
    let exc3 = this.expression.match(/([^\d]\.)|^\./g); // ^.12 or 12+.12
    if(exc1 || exc2 || exc3){
      this.expression = this.expression.slice(0,-1);
      return;
    }
    if(arr)
      expressionNode.textContent += char;
  },
  validateOperator: function(char) {
    this.expression += char;
    let arr = this.expression.match(/[-+][-+]/g);
    if(!arr)
      expressionNode.textContent += char;
    else
      this.expression = this.expression.slice(0, -1);
  },
  updateView: function() {
    
  }
}



/* calc.operands.enqueue(2,2,3);
calc.operators.enqueue('+', '+');
calc.operate(); */


const digits = document.querySelectorAll('.digits'),
      operators = document.querySelectorAll('.operators'),
      resultNode = document.querySelector('.result'),
      expressionNode = document.querySelector('.expression'),
      equalNode = document.querySelector('.equal'),
      clearNode = document.querySelector('.clear'),
      backspaceNode = document.querySelector('.backspace'),
      negativeSwitchNode = document.querySelector('.negative');


for(const digitsElem of digits)
  digitsElem.addEventListener('click', () => calc.validateOperand(digitsElem.value) /* calc.appendDigit(digitsElem.value)  */ );
for(const operatorsElem of operators)
  operatorsElem.addEventListener('click', () =>  calc.validateOperator(operatorsElem.value) /*  calc.addOperator(operatorsElem.value) */ );

equalNode.addEventListener('click', () => { calc.parseString(); calc.operate(); calc.updateView(); });

/* 
negativeSwitchNode.addEventListener('click', () => {calc.negativeSwitch();});
clearNode.addEventListener('click', () => calc.clear()); 
backspaceNode.addEventListener('click', () => calc.updateView()); */
 
 