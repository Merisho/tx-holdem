function _getOuts(hand) {
    return hand.size >= 4 && _isFlushDraw(hand) ? 9 : 0;
}

function _isFlushDraw(hand) {
    const suitsCount = {};
    hand.forEach(c => {
        if (!suitsCount[c.suit]) {
            suitsCount[c.suit] = 0;
        }

        suitsCount[c.suit]++;
    });

    return !!Object.keys(suitsCount).filter(s => suitsCount[s] === 4).length;
}

module.exports = function(hand) {
    return _getOuts(hand);
};