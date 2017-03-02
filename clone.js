'use strict'

// TODO: do a deep clone efficiently
module.exports = (value) => {
    if (typeof value !== 'object') {
        return value;
    }
    return JSON.parse(JSON.stringify(obj));
};

