'use strict' 

const ValueNode = require('./ValueNode.js')();

/*
 * Factory returns a root node, ready for population.
 */
module.exports = () => {

    /*
     * Root is a special value node--returned by the factory as an origin.
     */

    const root = new ValueNode();

    root._isRoot = true;

    /*
     * Traverses the tree for a specific node by lineage.
     */
    root._findNode = function(lineage, index, node) {
        if (index == undefined) {
            index = 0;
        }
        if (node == undefined) {
            node = this;
        }
        if (index === lineage.length) {
            return node;
        }
        const name = lineage[index];
        if (node[name]) {
            return this._findNode(lineage, index + 1, node[name]);
        }
        throw new Error('Could not find the indicated node by name: ' + name);
    };

    /*
     * "Private" implementation for getting the parent node without using a circular reference.
     */
    ValueNode.prototype._getParent = function() {
        return root._findNode(this._lineage);
    };

    return root;
};
