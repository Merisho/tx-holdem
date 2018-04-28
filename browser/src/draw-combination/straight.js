"use strict";

var cards = void 0;

function _getOuts(hand) {
    return hand.size >= 4 ? _calculateOuts(hand) : 0;
}

function _calculateOuts(hand) {
    return _commonDrawOuts(hand) || _gutshotDrawOuts(hand);
}

function _commonDrawOuts(hand) {
    var OPEN_DRAW = 4;
    var POSSIBLE_ONE_SIDE_DRAW = 3;

    var _getSequenceInfo2 = _getSequenceInfo(hand),
        sequenceCount = _getSequenceInfo2.sequenceCount,
        lastSequenceCards = _getSequenceInfo2.lastSequenceCards;

    var isLowestStraightDraw = sequenceCount === POSSIBLE_ONE_SIDE_DRAW && hand.lastCard == cards.ACE && lastSequenceCards == cards.FOUR;
    var isOpenDraw = sequenceCount === OPEN_DRAW;
    var isHishestStraightDraw = isOpenDraw && lastSequenceCards && lastSequenceCards == cards.ACE;

    if (isHishestStraightDraw || isLowestStraightDraw) {
        return OUTS.ONE_SIDE_STRAIGHT_DRAW;
    } else if (isOpenDraw) {
        return OUTS.OPEN_STRAIGHT_DRAW;
    }

    return 0;
}

function _gutshotDrawOuts(hand) {
    var sequences = _getGutshotSequenceInfo(hand);
    return _isGutshotStraightDraw(sequences) ? OUTS.GUTSHOT_STRAIGHT_DRAW : 0;
}

function _getSequenceInfo(hand) {
    var sequenceCount = 1;
    var previousSequenceCount = 1;
    var lastSequenceCards = void 0;

    hand.reduce(function (prev, curr) {
        if (curr - prev === 1) {
            sequenceCount++;
            lastSequenceCards = sequenceCount > 2 ? curr : lastSequenceCards;
        } else {
            sequenceCount > 2 && (previousSequenceCount = sequenceCount);
            sequenceCount = 1;
        }

        return curr;
    });

    return {
        sequenceCount: Math.max(sequenceCount, previousSequenceCount),
        lastSequenceCards: lastSequenceCards
    };
}

function _getGutshotSequenceInfo(hand) {
    var sequences = [];
    var sequenceCount = 1;
    var lastCard = void 0;

    lastCard = hand.reduce(function (prev, curr) {
        if (curr - prev === 1) {
            sequenceCount++;
        } else {
            sequences.push({ lastCard: prev, count: sequenceCount });
            sequenceCount = 1;
        }

        return curr;
    });

    sequences.push({ lastCard: lastCard, count: sequenceCount });

    return sequences;
}

function _isGutshotStraightDraw(sequences) {
    // gutshot is possible if given hand has up to 2 breaks in sequence
    if (sequences.length < 2 || sequences.length > 3) {
        return false;
    }

    // Gutshot is possible if either first two sequences (a, b) match formula
    // b.lastCard - b.count - a.lastCard === 1
    // or last two sequences (b, c)
    // So first of all we will try first two then second two cards
    var calculateDraw = function calculateDraw(len) {
        var s = sequences;

        var isFourCardsInBrokenSequence = s[len - 1].count > 1 || s[len - 2].count > 1;
        var spaceBetweenSubSequences = s[len - 1].lastCard - s[len - 1].count - s[len - 2].lastCard;

        return isFourCardsInBrokenSequence && spaceBetweenSubSequences === 1;
    };

    return calculateDraw(2) || sequences.length > 2 && calculateDraw(3);
}

var OUTS = {
    OPEN_STRAIGHT_DRAW: 8,
    GUTSHOT_STRAIGHT_DRAW: 4,
    ONE_SIDE_STRAIGHT_DRAW: 4
};

module.exports = function (cardsRanks) {
    cards = cardsRanks;
    return _getOuts;
};