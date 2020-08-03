let calc = {
  tokens: [],
  _expression: '',
  set expression(data){
    this._expression = data;
  },
  get expression(){
    return this._expression;
  },
  parseString: function() {
    let arr = this._expression.match(/\d+(\.\d+)?|\D/g); // number match
    this.tokens = [...arr]; // or t = t.concat(arr);
  },
  '+': function (a, b) {
    return a+b;
  },
  'x': function(a,b) {
    return a*b;
  },
  '-': function(a,b) {
    return a-b;
  },
  '/': function(a,b){
    return a/b
  },
  operate: function() {
    let num = this.tokens.shift();
    num = Number(num);
    let op = this.tokens.shift();
    let res = 0;
    if(!op)
      return num;
    if(op == 'x' || op == '/') {
      res = this[op](num, this.tokens.shift()); // '*'(a,b)
      this.tokens.unshift(res); 
      res = this.operate();
    }
    if(op == '+')
      res = this[op](num, this.operate());
    if(op == '-') { // -a = + (-a) 
      let next = -this.tokens.shift();
      this.tokens.unshift(num, '+', next);
      res = this.operate();
    }

    return res;
  },

  validateOperand: function(char) { // leading zeros problem
    this._expression += char;
    let arr = this._expression.match(/\d+(\.\d+)?/g); // 1.12 valid num
    let exc1 = this._expression.match(/\.\./g);
    let exc2 = this._expression.match(/\d+\.\d+\./); // 1.2.
    let exc3 = this._expression.match(/([^\d]\.)|^\./g); // ^.12 or 12+.12
    if(exc1 || exc2 || exc3){
      this._expression = this._expression.slice(0,-1);
      return;
    }
    if(arr)
      expressionNode.textContent += char;
  },

  validateOperator: function(char) {
    this._expression += char;
    let arr = this._expression.match(/[-+][-+]/g);
    if(!arr)
      expressionNode.textContent += char;
    else
      this._expression = this._expression.slice(0, -1);
  },

  clear: function() {
    this._expression = '';
    this.tokens = [];
    expressionNode.textContent = '';
    resultNode.textContent = '= 0';
  },

  backspace: function() {
    if(expressionNode.textContent == '')
      return;
    this._expression = this._expression.slice(0, -1);
    expressionNode.textContent = expressionNode.textContent.slice(0, -1);
  },
  
  updateResult: function(num) {
    resultNode.textContent = `= ${num}`;
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
operatorsElem.addEventListener('click', () => calc.validateOperator(operatorsElem.value));

equalNode.addEventListener('click', () => { calc.parseString(); calc.updateResult(calc.operate())});

//negativeSwitchNode.addEventListener('click', () => {calc.negativeSwitch();});
clearNode.addEventListener('click', () => calc.clear()); 
backspaceNode.addEventListener('click', () => calc.backspace());
