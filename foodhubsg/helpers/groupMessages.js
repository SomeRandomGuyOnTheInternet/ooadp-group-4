let _ = require('lodash');
const moment = require('moment');

function groupMessages(messageHistory, setDates = false) {
    let groupedMessages;
    let userMessages = _.groupBy(messageHistory);
    console.log(userMessages); 
    // for (let [date, messages] of Object.entries(userMessages)) {
    //     messageDate = _.groupBy(messages, 'Messages.createdAtDate');

    //     if (setDates == true) { date[i]["Messages.createdAt"] = moment(date[i]["Message.createdAt"]).format("DD-MM-YYYY"); }
    // } 
    // groupedMessages[date] = messageDate; 
    // return groupedMessages;
}





module.exports = groupMessages; 