var do_calcul = function() {


    var bcr = document.getElementById("BCR").value;
    var mde = document.getElementById("MDE").value;
    var freq = document.getElementById("frequency").value;
    var mod = document.getElementById("buyingmodel");
    var selected_mod = mod.options[mod.selectedIndex].text;
    var bvalue = document.getElementById("buyingvalue").value;

    bcr = Number(bcr.replace(",","."));
    mde = Number(mde.replace(",","."));
    freq = Number(freq.replace(",","."));
    bvalue = Number(bvalue.replace(",","."));

    bcr/= 100;
    mde/= 100;


    /*
    // Based on https://www.evanmiller.org/ab-testing/sample-size.html
    Args:
        alpha (float): How often are you willing to accept a Type I error (false positive)?
        power (float): How often do you want to correctly detect a true positive (1-beta)?
        bcr (float): Base conversion rate
        mde (float): Minimum detectable effect, relative to base conversion rate.

    */
    var alpha = 0.05;
    var power = 0.8;
   
    var delta = bcr * mde;
    var t_alpha2 = jStat.normal.inv(1 - alpha / 2, 0, 1);
    var t_beta = jStat.normal.inv(power, 0, 1);
    
    var sd1 = Math.sqrt(2 * bcr * (1 - bcr));
    var sd2 = Math.sqrt(bcr * (1 - bcr) + (bcr + delta) * (1 - bcr - delta));
    
    sampleSize = Math.pow(t_alpha2 * sd1 + t_beta * sd2, 2) / Math.pow(delta, 2);
    
    if(selected_mod == "CPM"){
      Budget = sampleSize * freq * bvalue / 1000; // Buy on CPM
    }else if(selected_mod == "CPC"){
      Budget = sampleSize * bvalue; // Buy on CPC
    }


    document.getElementById("sampc").innerHTML = Math.round(sampleSize).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById("sampt").innerHTML = Math.round(sampleSize).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('budgetc').innerHTML = Math.round(Budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + document.getElementById('currency').value;
    document.getElementById('budgett').innerHTML = Math.round(Budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + document.getElementById('currency').value;
    document.getElementById('samptot').innerHTML = Math.round(sampleSize*2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('budgettot').innerHTML = Math.round(Budget*2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + document.getElementById('currency').value;
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
