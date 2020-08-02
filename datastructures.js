"use strict"
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

let calc = {
  operators: new Queue(),
  operands: new Queue(),
  curOperand: '',
  prevOperand: '', 
  expression: '',
  method: null,
  log: [],
  operate: function() {
    if(calc.operators.isEmpty()) {
      calc.operands.clear();
      calc.operators.clear();
      return;
    }  
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
  parseString: function() {
    let temp = null;
    temp = calc.expression.match(/^\-\d+(\.\d+)?|\d+(\.\d+)?/g);
    if(temp)
      this.operands.enqueue(temp);
    if(calc.expression.match(/^[\-]/)) // negative number handler
      {
        temp = calc.expression.substr(1).match(/[^\.\d]/g);
        if(temp)
          this.operators.enqueue(temp);   
      }   
    else {
      temp = calc.expression.match(/[^\.\d]/g); 
      if(temp) 
        this.operators.enqueue(temp);
    }
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
  clear: function() {
    this.expression = '';
    this.operators.clear();
    this.operands.clear();
    expressionNode.textContent = '';
    resultNode.textContent = '= 0';
  },
  backspace: function() {
    if(expressionNode.textContent == '')
      return;
    this.expression = this.expression.slice(0, -1);
    expressionNode.textContent = expressionNode.textContent.slice(0, -1);
  }
}

const digits = document.querySelectorAll('.digits'),
      operators = document.querySelectorAll('.operators'),
      resultNode = document.querySelector('.result'),
      expressionNode = document.querySelector('.expression'),
      equalNode = document.querySelector('.equal'),
      clearNode = document.querySelector('.clear'),
      backspaceNode = document.querySelector('.backspace'),
      negativeSwitchNode = document.querySelector('.negative');


for(const digitsElem of digits)
  digitsElem.addEventListener('click', () => calc.validateOperand(digitsElem.value));
for(const operatorsElem of operators)
  operatorsElem.addEventListener('click', () =>  calc.validateOperator(operatorsElem.value));

equalNode.addEventListener('click', () => { calc.parseString(); calc.operate(); });
 
//negativeSwitchNode.addEventListener('click', () => {calc.negativeSwitch();});
clearNode.addEventListener('click', () => calc.clear()); 
backspaceNode.addEventListener('click', () => calc.backspace());
 
 