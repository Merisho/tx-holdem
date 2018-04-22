let cards;

function _getOuts(hand) {
    return hand.size >= 4 ? _calculateOuts(hand) : 0;
}

function _calculateOuts(hand) {
    return _commonDrawOuts(hand) || _gutshotDrawOuts(hand);
}

function _commonDrawOuts(hand) {
    const OPEN_DRAW = 4;
    const POSSIBLE_ONE_SIDE_DRAW = 3;

    const { sequenceCount, lastSequenceCards } = _getSequenceInfo(hand);

    const isLowestStraightDraw = sequenceCount === POSSIBLE_ONE_SIDE_DRAW && hand.lastCard == cards.ACE && lastSequenceCards == cards.FOUR;
    const isOpenDraw = sequenceCount === OPEN_DRAW;
    const isHishestStraightDraw = isOpenDraw && lastSequenceCards && lastSequenceCards == cards.ACE;

    if(isHishestStraightDraw || isLowestStraightDraw) {
        return OUTS.ONE_SIDE_STRAIGHT_DRAW;
    } else if(isOpenDraw) {        
        return OUTS.OPEN_STRAIGHT_DRAW;
    }

    return 0;
}

function _gutshotDrawOuts(hand) {
    const sequences = _getGutshotSequenceInfo(hand);
    return _isGutshotStraightDraw(sequences) ? OUTS.GUTSHOT_STRAIGHT_DRAW : 0;
}

function _getSequenceInfo(hand) {
    let sequenceCount = 1;
    let previousSequenceCount = 1;
    let lastSequenceCards;
    
    hand.reduce((prev, curr) => {
        if(curr - prev === 1) {
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
        lastSequenceCards
    };
}

function _getGutshotSequenceInfo(hand) {
    const sequences = [];
    let sequenceCount = 1;
    let lastCard;

    lastCard = hand.reduce((prev, curr) => {
        if(curr - prev === 1) {
            sequenceCount++;
        } else {
            sequences.push({ lastCard: prev, count: sequenceCount });
            sequenceCount = 1;
        }

        return curr;
    });

    sequences.push({ lastCard, count: sequenceCount });

    return sequences;
}

function _isGutshotStraightDraw(sequences) {
    // gutshot is possible if given hand has up to 2 breaks in sequence
    if(sequences.length < 2 || sequences.length > 3) {
        return false;
    }

    // Gutshot is possible if either first two sequences (a, b) match formula
    // b.lastCard - b.count - a.lastCard === 1
    // or last two sequences (b, c)
    // So first of all we will try first two then second two cards
    let calculateDraw = len => {
        const s = sequences;

        const isFourCardsInBrokenSequence = s[len - 1].count > 1 || s[len - 2].count > 1;
        const spaceBetweenSubSequences = s[len - 1].lastCard - s[len - 1].count - s[len - 2].lastCard;

        return isFourCardsInBrokenSequence && spaceBetweenSubSequences === 1;
    };

    return calculateDraw(2) || (sequences.length > 2 && calculateDraw(3));
}

const OUTS = {
    OPEN_STRAIGHT_DRAW: 8,
    GUTSHOT_STRAIGHT_DRAW: 4,
    ONE_SIDE_STRAIGHT_DRAW: 4
};

module.exports = function(cardsRanks) {
    cards = cardsRanks;
    return _getOuts;
};