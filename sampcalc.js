var do_calcul = function() {
    var num1 = Number(document.getElementById("BCR").value);
    var num2 = Number(document.getElementById("CPM").value);
    var mde = Number(document.getElementById('MDE').value);
    var result;
    num1/= 100;
    mde /= 100;
    conv = (1+mde)*num1;

    a = 1.645 * Math.sqrt(((2+mde)*(2-2*(num1)-num1*mde)/2));
    b = 0.842 * Math.sqrt(1-num1 + (1+mde)*(1-num1-num1*mde));
    sampleSize = Math.pow(a+b, 2)/(Math.pow(mde,2)*num1);
    Budget = (num2/1000)*sampleSize;
    Budget1 = Math.round((Budget + Number.EPSILON) * 100) / 100;
    BudgetPrWeek = Budget /3;
    BudgetprWeek1 = (Math.round((BudgetPrWeek + Number.EPSILON) * 100) / 100).toString()

    document.getElementById("samp").innerHTML = Math.round(sampleSize);
    document.getElementById('budget').innerHTML = Budget1 + " " + document.getElementById('currency').value
    document.getElementById('bo3w').innerHTML = BudgetprWeek1 + " " + document.getElementById('currency').value
    document.getElementById('incr').innerHTML = "An uplift from " + num1*100 + "% to " + (conv*100).toFixed(3) + "% is significant if we have:"
};

var signs_buttons = document.getElementById("ssize");
var inputs = document.getElementsByClassName('wrapper')
signs_buttons.addEventListener('click',do_calcul, false);

for(var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("ssize").click();
  }
});
