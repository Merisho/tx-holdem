function _getOuts(hand) {
    return hand.size >= 4 && _isFlushDraw(hand) ? 4 : 0;
}

function _isFlushDraw(hand) {
    const suitsCount = [0, 0, 0, 0];
    hand.forEach(c => suitsCount[c.suit]++);

    return !!suitsCount.filter(s => s === 4).length;
}

module.exports = function(hand) {
    return _getOuts(hand);
};