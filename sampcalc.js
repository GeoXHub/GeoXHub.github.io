var do_calcul = function() {
    var mod = document.getElementById("buyingmodel");
    var selected_mod = mod.options[mod.selectedIndex].text;
    var num1 = document.getElementById("BCR").value;
    var num2 = document.getElementById("CPM").value;
    var freq = document.getElementById("Frequency").value;
    var ctr = document.getElementById("CTR").value;
    var maxbud = document.getElementById("maxbudget").value;
    num1 = Number(num1.replace(",","."));
    num2 = Number(num2.replace(",","."));
    freq = Number(freq.replace(",","."));
    ctr  = Number(ctr.replace(",","."));
    mdearr = [0.05, 0.06, 0.07, 0.08, 0.09,  0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.2, 0.25, 0.3, 0.35];
    num1/= 100;
    conv = [];
    conv1 = [];
    a = [];
    b = [];
    sampleSize1 = [];
    Budgets = [];
    cost = []
    
    for(var i=0;i<mdearr.length;i++){
    conv[i] = (1+mdearr[i])*num1;
    conv1[i] = (1-mdearr[i])*num1;
    a[i] = 1.96 * Math.sqrt(((2+mdearr[i])*(2-2*(num1)-num1*mdearr[i])/2));
    b[i] = 0.842 * Math.sqrt(1-num1 + (1+mdearr[i])*(1-num1-num1*mdearr[i])); 
    sampleSize1[i] = Math.pow(a[i]+b[i], 2)/(Math.pow(mdearr[i],2)*num1);
    if(selected_mod == "CPM"){
      Budgets[i] = (num2/1000)*sampleSize1[i]; // for CPM
      cost[i] = Budgets[i]*freq*2;
    }else{
      Budgets[i] = (num2)*sampleSize1[i]; // for CPC
      cost[i] = Budgets[i]*ctr*2;
    }
    }
    let Budget = Math.max(...cost.filter(num => num <= maxbud));

    mde = mdearr[cost.indexOf(Budget)]

    if(mde <= 0.15){
      var risk1 = "Small risk of not getting significant results"
      document.getElementById("risk").style.color = "green"
    }else if(mde >0.15  & mde <= 0.25){
      risk1 = "Some risk of not getting significant results"
      document.getElementById('risk').style.color = "orange"
    }else if(mde >0.25){
      risk1 = "HIGH RISK of not getting significant results"
      document.getElementById('risk').style.color = "red"
    }else{
      if (selected_mod == "CPM"){
        risk1 = "You need at least " + (Math.min.apply(Math, Budgets)*2*freq).toFixed(2) + " " + document.getElementById('currency').value + " to conduct a test with these values"
        document.getElementById('risk').style.color = "red"
      }else{
        risk1 = "You need at least " + (Math.min.apply(Math, Budgets)*2*ctr).toFixed(2) + " " + document.getElementById('currency').value + " to conduct a test with these values"
        document.getElementById('risk').style.color = "red"
      }
    }
    

    
    sampleSize = sampleSize1[cost.indexOf(Budget)]

    Budget1 = Math.round(((Budget) + Number.EPSILON) * 100) / 100;

    document.getElementById("sampc").innerHTML = Math.round(sampleSize).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById("sampt").innerHTML = Math.round(sampleSize).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    document.getElementById('budgetc').innerHTML = (Budget1/2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + document.getElementById('currency').value;
    document.getElementById('budgett').innerHTML = (Budget1/2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + document.getElementById('currency').value;
    document.getElementById('risk').innerHTML = risk1
    document.getElementById('incr').innerHTML = "Only a result of < " + (conv1[cost.indexOf(Budget)]*100).toFixed(3) + "% or > " + (conv[cost.indexOf(Budget)]*100).toFixed(3) + "% is significant if we have:"
    document.getElementById('samptot').innerHTML = Math.round(sampleSize+sampleSize).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('budgettot').innerHTML = (Budget1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + document.getElementById('currency').value;
    document.getElementById('mde').innerHTML = "The MDE is: " + mde*100 + "%"
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
