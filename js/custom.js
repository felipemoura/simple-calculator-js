$(document).ready(function () {

  var currentTime = new Date();

  // returns the year (four digits)
  document.getElementById("year").innerHTML = currentTime.getFullYear()



  var stack = [];
  stack.push(0);

  var operations = [];
  var dot = false;

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
  $('#_ce').on('click',function() { callForOperation('ce'); });
  

  // Operations of the calculator
  function callForOperation (param) {
    $('.screen').empty();

    if (param === 'ac') {
      stack = [];
      dot = false;

    } else if (param === 'ce') {
      stack = [];
      stack.push(0);
      dot = false;

    } else if  ((param === '+') || (param === '/') || (param === '-') || (param === 'x') || (param === '=')) {
      if (stack.length > 0) {
        stack = [];
        var temp = stack.join("");
        stack.push (temp);
        stack.push (param);
      }

    } else {
      if ((param === '.') && (dot === false)) {
        stack.push(param);
        dot = true;
      } else if ((param === '.') && (dot === true)) {
        // continue;
      } else {
        stack.push(param);
      }
    }

    $.each(stack, function (index, key) {
      $('.screen').append(key);
    });
  }

});