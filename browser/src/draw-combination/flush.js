"use strict";

function _getOuts(hand) {
    return hand.size >= 4 && _isFlushDraw(hand) ? 9 : 0;
}

function _isFlushDraw(hand) {
    var suitsCount = {};
    hand.forEach(function (c) {
        if (!suitsCount[c.suit]) {
            suitsCount[c.suit] = 0;
        }

        suitsCount[c.suit]++;
    });

    return !!Object.keys(suitsCount).filter(function (s) {
        return suitsCount[s] === 4;
    }).length;
}

module.exports = function (hand) {
    return _getOuts(hand);
};