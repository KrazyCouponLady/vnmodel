'use strict'

const vnm = require('../index.js');
const expect = require('chai').expect;

describe('vnm', function() {
    it('should create a root node that has no value per se', function() {
        let root = vnm();
        expect(root._value).to.equal(undefined);
    });
    
    it('should add a child model to the root, exposed as standard properties', function() {
        let root = vnm();
        root.extend({ a: 1, b: { c: 2 } });
        expect(root.a._value).to.equal(1);
        expect(root.b.c._value).to.equal(2);
    });

    it('should notify all listeners when a value is published', function() {
        let root = vnm();
        root.extend({ a: 1, b: { c: 2 } });
        let results = {a:false, c:false, c2:false};
        root.a.subscribe((name, newValue, oldValue) => {
            results.a = newValue === 3 && oldValue === 1;
        });
        root.b.c.subscribe((name, newValue, oldValue) => {
            results.c = newValue === 4 && oldValue === 2;
        });
        root.b.c.subscribe((name, newValue, oldValue) => {
            results.c2 = newValue === 4 && oldValue === 2;
        });
        root.a.publish(3);
        root.b.c.publish(4);
        expect(results.a).to.equal(true);
        expect(results.c).to.equal(true);
        expect(results.c2).to.equal(true);
    });

    it('should not retuen _value or _listeners when calling _getChildren', function() {
        let root = vnm();
        root.extend({foo:'bar'});
        let children = root._getChildren();
        expect(children.length).to.equal(1);
        expect(children[0]._value).to.equal('bar');
    });
});
