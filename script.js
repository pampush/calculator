/* try to code using inheritance next time*/
/* todo: computations history */
/* todo: continious computations 3+2*3 - done*/
/* todo: float nums approximation 7.1 *3 = 21.29999999997 */
/* todo: support negative nums */
/* plus two buttons: minus and history */
"use strict"
function Calculator() {
  this.left = [];
  this.right = [];
  this.flag = 0;
  this.method = null;
  this.bin = true;
  this.history = [];
  this.reset = function () {
    let elem = document.querySelector(".grid-container__text");//let elem = document.querySelector("input[type='textarea']");
    elem.value = '';
    this.flag = 0;
    this.bin = true;
    let elems = document.querySelectorAll('.oper');
    elems.forEach(elem => elem.classList.remove('nonClickable'));
    
    elems = document.querySelectorAll('.digit');
    elems.forEach(elem => elem.classList.remove('nonClickable'));
    this.left = [];
    this.right = [];
  };

  this.decor = function () {
    if(this.left.length == 0 )
      return;
    
    let a = document.querySelector(".grid-container__text");//let a = document.querySelector("input[type='textarea']");
    a.value += ` ${event.currentTarget.value} `;

    this.flag = 1;
    if(event.currentTarget.name == 'fact')
      this.bin = false;
    this.method = this[event.currentTarget.name]();

    let elems = document.querySelectorAll('.digit');
    elems.forEach(elem => elem.classList.remove('nonClickable'));
    /* let elems = document.querySelectorAll('.oper');
    elems.forEach(elem => elem.classList.add('nonClickable')); */
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

  this.computeUn = function() {
    if(!this.method)
      return;     
    let numL = Number(this.left.join());
    this.view( this.method(numL) );
  };
  
  this.view = function(result) {
    let a = document.querySelector(".grid-container__text");//let a = document.querySelector("input[type='textarea']");
    a.value = `${result}`;
  }

  this.computeBin = function() {
    if(!this.method)
      return;  
    let numL = 0, numR = 0;
    numL = Number(this.left.join(''));
    numR = Number(this.right.join(''));
    
    this.left = this.method(numL, numR); // left = result
    this.log();
    this.view( this.left );

    this.right = [];
    this.left = Array.from(String(this.left));
    let elems = document.querySelectorAll('.digit');
    elems.forEach(elem => elem.classList.add('nonClickable'));
  };

  this.log = function () {
    //this.history.push(`${document.querySelector('.grid-container__text').value} = ${this.left}`);
    let log = document.querySelector('.grid-container__log-pop');
    log.innerHTML += `${document.querySelector('.grid-container__text').value} = ${this.left} \n`; 
  }

  this.update = function(value) { 
    function upd () {
      let a = document.querySelector(".grid-container__text");//let a = document.querySelector("input[type='textarea']");
      a.value += `${value}`;
      if(this.flag == 0)
        this.left.push(value);
      else
        this.right.push(value);
    }
    upd = upd.bind(this);
    return upd;
  }; 

this.reset = this.reset.bind(this);
this.decor = this.decor.bind(this);
}

function Buttons() {
  this.addButton = function(name, elem) {
    this[name] = elem;
  }
     
  this.addListener = function(elem, func) {
    elem.addEventListener('click', func);
  }

  this.addListeners = function(elems, func) {
    elems.forEach(elem => elem.addEventListener('click', func));
  }
}

Number.prototype.mod = function(a, b) {
  return ((a % b) + b) % b;
};


let buttons = new Buttons();
let calc = new Calculator();
let arr = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 
          'seven': 7, 'eight': 8, 'nine': 9, 'zero': 0, 'point': '.' };

for(let key in arr){
  buttons.addButton(key, document.querySelector(`input[name="${key}"]`));
  buttons.addListener(buttons[key], calc.update(arr[key]));
}

buttons.addButton('compute', document.querySelector("input[name='res']"));
buttons.addListener(buttons.compute, () => { if(calc.bin) calc.computeBin(); else calc.computeUn(); });

buttons.addButton('operations', document.querySelectorAll('.oper'));
buttons.addListeners(buttons.operations, calc.decor);

buttons.addButton('clear', document.querySelector("input[name='clear']"));
buttons.addListener(buttons.clear, calc.reset);

buttons.addButton('logButton', document.querySelectorAll('.grid-container__log-button'));
buttons.addListeners(buttons.logButton, ()=> { let elem = document.querySelector('.grid-container__log-pop');
elem.classList.toggle('grid-container__log-pop-view');
});
