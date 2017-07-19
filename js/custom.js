$(document).ready(function () {
  // returns the year (four digits)
  document.getElementById("year").innerHTML = new Date().getFullYear();

  $('#_0').on('click',function() {  callForOperation(0);  });
  $('#_1').on('click',function() {  callForOperation(1);  });
  $('#_2').on('click',function() {  callForOperation(2);  });
  $('#_3').on('click',function() {  callForOperation(3);  });
  $('#_4').on('click',function() {  callForOperation(4);  });
  $('#_5').on('click',function() {  callForOperation(5);  });
  $('#_6').on('click',function() {  callForOperation(6);  });
  $('#_7').on('click',function() {  callForOperation(7);  });
  $('#_8').on('click',function() {  callForOperation(8);  });
  $('#_9').on('click',function() {  callForOperation(9);  });
  $('#_pt').on('click',function() { callForOperation('.');  });
  $('#_div').on('click',function() {  callForOperation('/');  });
  $('#_mul').on('click',function() {  callForOperation('x');  });
  $('#_sum').on('click',function() {  callForOperation('+');  });
  $('#_sub').on('click',function() {  callForOperation('-');  });
  $('#_equal').on('click',function() {  callForOperation('=');  });
  $('#_ac').on('click',function() { callForOperation('ac'); });
  $('#_plusMinus').on('click',function() { callForOperation('-+'); });

  // variables
  var stack = [];
  var numbers = [];
  var operations = [];
  var dot = false;

  // clean scren
  function cleanParameters () {
    stack = [];
    operations = [];
    dot = false;
  }

  function doOperation (arg1, arg2, operator) {
    arg1 = (arg1 == null) ? 0 : Number(arg1);
    arg2 = (arg2 == null) ? 0 : Number(arg2);
    let aux;

    switch(operator) {
        case '+':
                  aux = arg1+arg2; 
                  break;
        case '-':
                  aux = arg1-arg2; 
                  break;
        case 'x':
                  aux = arg1*arg2; 
                  aux = aux.toPrecision(4); 
                  break;
        case '/':
                  aux = arg1/arg2;
                  aux = aux.toPrecision(4); 
                  break;
    } 
    return aux;//(aux.toString().length <= 12) ? aux : "Error";
  }

  function repaint(){
    // repaint screen
    $.each(stack, function (index, key) {
      $('.screen').append(key);
    });
  }

  // Operations of the calculator
  function callForOperation (param) {
    // clean screen
    $('.screen').empty();

    // clean parameters 
    if (param === 'ac') { 
      cleanParameters ();

    } else if (param === '-+') {
      let temp = (-1) * Number(stack.join(""));
      stack = [];
      stack = temp.toString().split("");


    // operation 
    } else if ( (param === '+') || (param === '/') || (param === '-') || (param === 'x') ) {
      if (stack.length > 0) {
        if (numbers.length > 0) {
          result = doOperation (numbers.pop(), stack.join (""), operations.pop() );
        } else {
          result = stack.join ("");
        }
        numbers.push (result);

      } else {
        numbers.push (0);
      }
      operations.push (param);
      stack = [];
      dot = false;

    // EQUAL - result of operation
    } else if (param === '=') {
      if (numbers.length > 0 && operations.length > 0) {
        result = doOperation (numbers.pop(), stack.join (""), operations.pop() );
        stack = [];
        dot = false;
        stack.push (result);
      }

    } else {
      // DOT - DECIMAL
      if ((param === '.') && (dot === false)) {
        if (stack.length == 0) {
          stack.push(0);
        }
        stack.push(param);
        dot = true;

      } else if ((param === '.') && (dot === true) || (stack.length > 12) || ( (stack.length == 1 && stack[0] == 0) && (param == 0) ) ) {
        // continue;
        // do nothing

      // numbers
      } else {
        if ( (stack.length == 1) && (param != 0) && (stack[0] == 0) ){
          stack.pop();
        } 
        stack.push(param);
      }
    }

    (stack.length <= 0) ? $('.screen').append (0) : repaint() ;
  }
// done
});