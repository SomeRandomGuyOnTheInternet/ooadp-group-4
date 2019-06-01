const moment = require('moment'); 

module.exports = {
    formatDate: function (date, targetFormat) {
        console.log(date);
        return moment(date).format(targetFormat);
    },

    checkMealType: function (mealType, targetMealType, options) {
        console.log(mealType);
        if (mealType == targetMealType) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
        
    },
};