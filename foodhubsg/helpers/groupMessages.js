let _ = require('lodash');
const moment = require('moment');

function groupMessages(messageHistory, setDates = false) {
    let groupedMessages;
    let userMessages = _.groupBy(messageHistory);
    console.log(userMessages);
    for (let [messages] of Object.entries(userMessages)) {
        messageDate = _.groupBy(messages, 'Messages.createdAtDate');
        console.log(messageDate);
        // for (let [date] of Object.entries(messageDate)) {

        //         if (setDates == true) { date[i]["Messages.createdAt"] = moment(date[i]["FoodLogs.createdAt"]).format("h:mm a"); }
        //     }
        // }

    }
    // groupedMessages[date] = messageDate
    // return groupedMessages;
}


module.exports = groupMessages; 