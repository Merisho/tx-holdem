function _getOuts(hand) {
    return +(hand.size >= 4) && _calculateOuts(hand);
}

function _calculateOuts(hand) {
    if(hand.isTwoPairs()) {
        return 4;
    } else if(hand.isThreeOfKind()) {
        return hand.size === 4 ? 3 : 6;
    }

    return 0;
}

module.exports = function(hand) {
    return _getOuts(hand);
};