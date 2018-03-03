function _getOuts(hand) {
    return +hand.isThreeOfKind();
}

module.exports = function(hand) {
    return _getOuts(hand);
};