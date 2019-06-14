var _ = require('lodash');

function groupVendors(vendors) {
    groupedVendors = _.groupBy(vendors, 'name');
    return groupedVendors;
};

module.exports = groupVendors;