'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = require('../card');
var straightOuts = require('./straight');
var flush = require('./flush');
var fullHouse = require('./full-house');

var straight = straightOuts(Card);

var DrawCombination = function () {
    function DrawCombination(hand) {
        _classCallCheck(this, DrawCombination);

        this._hand = hand;
        this._outs = null;
        this._type = null;
    }

    _createClass(DrawCombination, [{
        key: '_calculateOuts',
        value: function _calculateOuts() {
            var straightOuts = straight(this._hand);
            var flushOuts = flush(this._hand);
            var fullHouseOuts = fullHouse(this._hand);

            return straightOuts + flushOuts + fullHouseOuts;
        }
    }, {
        key: 'outs',
        get: function get() {
            if (!this._outs) {
                return this._outs = this._calculateOuts();
            }

            return this._outs;
        }
    }]);

    return DrawCombination;
}();

module.exports = DrawCombination;