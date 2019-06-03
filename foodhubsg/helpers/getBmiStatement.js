function getBmiStatement(weight, height, name) {
    var bmi = (weight / (height * height)).toFixed(2);
    var idealWeight = weight;
    var bmiStatement;

    if (bmi < 22) {
        while (idealWeight / (height * height) < 23) { idealWeight += 1; };
      
        var gainWeight = idealWeight - weight;
        bmiStatement = `${name}, you have a BMI of ${bmi}, which is below the healthy range of 22 to 24. You are recommended to gain ${gainWeight} kg to reach a body mass of ${idealWeight} kg, which will get you back to the healthy BMI range.`

    } else if(bmi > 24) {
        while (idealWeight / (height * height) > 23) { idealWeight -= 1; };

        var loseWeight = weight - idealWeight;
        bmiStatement = `${name}, you have a BMI of ${bmi}, which is below the healthy range of 22 to 24. You are recommended to lose ${loseWeight} kg to reach a body mass of ${idealWeight} kg, which will get you back to the healthy BMI range.`

    } else {
        bmiStatement = `${name}, you have a BMI of ${bmi}, which is exactly within the healthy BMI range. Keep it up!`
    }
    
    return bmiStatement;
};

module.exports = getBmiStatement;