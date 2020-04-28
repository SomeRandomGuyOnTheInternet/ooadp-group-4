let _ = require('lodash');
const moment = require('moment');


function groupMessages(messageHistory) {
    return _.groupBy(messageHistory, messageDate => { return moment.utc(messageDate.createdAt).local().format("DD-MM-YYYY"); });
}


module.exports = groupMessages; 