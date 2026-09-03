function calculateEMI(price, tenureMonths , annualInterestRate){
    if(annualInterestRate === 0){
        const monthlyAmount = price / tenureMonths;
        return Math.round(monthlyAmount);
    }

    const monthlyRate = annualInterestRate / 12 / 100;
    const numerator = price * monthlyRate * Math.pow(1 + monthlyRate , tenureMonths);
    const denominator = Math.pow(1 + monthlyRate , tenureMonths) - 1;
    const monthlyAmount = numerator / denominator;

    return Math.round(monthlyAmount)
}

module.exports = {calculateEMI};