let calc = {
  operators: [],
  operands: [],
  _expression: '',
  set expression(data){
    this._expression = data;
  },
  get expression(){
    return this._expression;
  },
  parseString: function() {
    let arr = this._expression.match(/\d+(\.\d+)?/g); // number match
    arr = arr.map(elem => Number(elem));
    this.operands = [...arr]; // or t = t.concat(arr);
    arr = this._expression.match(/[\D]/g); 
    this.operators = [...arr];
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
  }
}
calc.expression = '2+2*3/4-20';
calc.parseString();
let res = calc.operands.reduce(function(accum, curValue) { return calc[calc.operators.shift()](accum, curValue) });
console.log(res);

/* recursive */ 
/* 
function foo(exp) {
  num = exp.pop();
  op = exp.pop();
  if(!op)
    return num;
  if(op == '*') {
    res = num * foo(exp);
  }
  if(op == '+')
    res = num + foo(exp);

  return res;
}

console.log(foo([4, '+', 2, '*', 3]));
 */