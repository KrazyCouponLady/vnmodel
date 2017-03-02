'use strict' 

const equal = require('./equal.js');

/*
 * Factory returns a root node, ready for population.
 */
module.exports = () => {

    const root = new ValueNode();

    // TODO: Add function to root node only for finding one of it's children with a lineage array

    function ValueNode(value, name, parentNode) {
        this._listeners = [];
        this._value = value;
        this._name = name;
        this._parent = parentNode;
    }

    /*
     * "Private" implementation getter for properties that are not "private".
     */
    ValueNode.prototype._getChildren = function() {
        let children = [];
        const names = Object.getOwnPropertyNames(this)
            .filter((value) => {
                return value.indexOf('_') !== 0;
            });

        for (var i = 0, length = names.length; i < length; i++) {
            children.push(this[names[i]]);
        }
        return children;
    };

    /*
     * "Private" implementation for getting the parent node without using a circular reference
     */
    ValueNode.prototype._getParent = function() {
        // TODO: contact the root node, traverse children properties to thejparent
    };

    /*
     * Attaching a model will create children nodes on the parent.
     */
    ValueNode.prototype.extend = function(model) {
        const properties = Object.getOwnPropertyNames(model);
        for (var i = 0, length = properties.length; i < length; i++) {
            let property = properties[i];
            if (typeof model[property] === 'object') {
                this[property] = new ValueNode(undefined, property, []); // TODO: lineage array
                this[property].extend(model[property]);
            }
            else {
                this[property] = new ValueNode(model[property], property, []); // TODO: lineage array
            }
        }
    };

    /*
     * Subscriber's on a node, and the node's ancestors, hear all of the updates to the value.
     */
    ValueNode.prototype.subscribe = function(listener) {
        if (typeof listener !== 'function') {
            throw new Error('Listeners must be functions, for example: (name, newValue, oldValue) => { ... }');
        }
        this._listeners.push(listener);
        const thisNode = this;
        return function unsubscribe() {
            const index = thisNode._listeners.indexOf(listener);
            if (index > -1) {
                thisNode._listeners.splice(index, 1);
            }
        };
    };

    /*
     * Publish a change to the node's channel; subscribers will be notified of changes.
     */
    ValueNode.prototype.publish = function(value) {
        let oldValue = this._value; // TODO: clone???
        this._value = value; // TODO: clone???
        if (!equal(this._value, oldValue)) {
            this._notify(this, this._value, oldValue);
        }
    };

    /*
     * "Private" implementation for calling listeners on a value node. 
     * TODO; recursively notify parents
     */
    ValueNode.prototype._notify = function(node, newValue, oldValue) {
        let i = 0, length = 0;

        for (i = 0, length = node._listeners.length; i < length; i++) {
            node._listeners[i](node._name, newValue, oldValue);
        }
    };

    return root;
};
