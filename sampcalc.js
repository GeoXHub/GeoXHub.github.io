var do_calcul = function() {
    var num1 = document.getElementById("BCR").value;
    var num2 = document.getElementById("CPM").value;
    var freq = document.getElementById("Frequency").value;
    num1 = Number(num1.replace(",","."));
    num2 = Number(num2.replace(",","."));
    freq = Number(freq.replace(",","."))
    var mde = 5;
    num1/= 100;
    mde /= 100;
    conv = (1+mde)*num1;

    a = 1.645 * Math.sqrt(((2+mde)*(2-2*(num1)-num1*mde)/2));
    b = 0.842 * Math.sqrt(1-num1 + (1+mde)*(1-num1-num1*mde));
    sampleSize = Math.pow(a+b, 2)/(Math.pow(mde,2)*num1);
    Budget = (num2/1000)*sampleSize;
    Budget1 = Math.round(((Budget*freq) + Number.EPSILON) * 100) / 100;

    document.getElementById("sampc").innerHTML = "Within 10 % variance of test sample size";
    document.getElementById("sampt").innerHTML = Math.round(sampleSize).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    document.getElementById('budgetc').innerHTML = "&#8773;" + Budget1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + document.getElementById('currency').value;
    document.getElementById('budgett').innerHTML = Budget1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + document.getElementById('currency').value;
    document.getElementById('incr').innerHTML = "An uplift from " + num1*100 + "% to " + (conv*100).toFixed(3) + "% is significant if we have:"
    document.getElementById('samptot').innerHTML = "&#8773;" + Math.round(sampleSize+sampleSize).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('budgettot').innerHTML = "&#8773;" + (Budget1 + Budget1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + document.getElementById('currency').value;
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

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

}
