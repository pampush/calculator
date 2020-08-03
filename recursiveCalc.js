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
  '*': function(a,b) {
    return a*b;
  },
  '-': function(a,b) {
    return a-b;
  },
  '/': function(a,b){
    return a/b
  },

  rec: function() {
    let num = this.tokens.shift();
    num = Number(num);
    let op = this.tokens.shift();
    let res = 0;
    if(!op)
      return num;
    if(op == '*' || op == '/') {
      res = this[op](num, this.tokens.shift()); // '*'(a,b)
      this.tokens.unshift(res); 
      res = this.rec();
    }
    if(op == '+')
      res = this[op](num, this.rec());
    if(op == '-') { // -a = + (-a) 
      let next = -this.tokens.shift();
      this.tokens.unshift(num, '+', next);
      res = this.rec();
    }

    return res;
  }
}
calc.expression = '1-1-10-2*6+10-1';
calc.parseString();
console.log(calc.rec());