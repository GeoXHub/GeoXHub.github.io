function budgets(conv1, cpm, mde = 0.05, duration = 3){
    conv1/= 100;
    let conv2 = conv1*mde+conv1;
    let sampleSize = conv1*(1-conv1)+conv2*(1-conv2)/(Math.pow(conv1-conv2,2)*Math.pow(0.84+1.96,2));
    let Budget = (cpm/1000)*sampleSize;
    let BudgetPrWeek = Budget /duration;
    return [Math.round(sampleSize), Math.round(Budget), Math.round(BudgetPrWeek)]
}

console.log(budgets(1.5,50))