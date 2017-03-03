'use strict'

// verify some IRL examples here
const vnm = require('../index.js')();
const expect = require('chai').expect;

vnm.extend({
    user: {
        firstName: 'Joe',
        lastName: 'Podsmack'
    }
});

vnm.extend({ ui: { view: { login: { buttonState: false } } } });

describe('syntax', function() {
    it('should populate multiple childrent under the root', function() {
        expect(vnm.user.firstName._value).to.equal('Joe');
    });
});
