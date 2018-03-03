const Card = require('../card');
const straightOuts = require('./straight');
const flush = require('./flush');
const fullHouse = require('./full-house');

const straight = straightOuts(Card);

let drawTypes = {
    straight: false,
    flush: false,
    fullHouse: false
};

class DrawCombination {
    constructor(hand) {
        this._hand = hand;
        this._outs = null;
        this._type = null;
    }

    get outs() {
        if(!this._outs) {
            return this._outs = _calculateOuts(this._hand);
        }

        return this._outs;
    }

    get type() {
        if(!this._outs) {
            this._outs = _calculateOuts(this._hand);
        }

        if(drawTypes.fullHouse) {
            return DrawCombination.FULL_HOUSE_DRAW;
        } else if(drawTypes.flush) {
            return DrawCombination.FULL_HOUSE;
        } else if(drawTypes.straight) {
            return DrawCombination.STRAIGHT_DRAW;
        }

        return null;
    }

    get FULL_HOUSE_DRAW() {
        return 'full house draw';
    }

    get STRAIGHT_DRAW() {
        return 'straight draw';
    }

    get FLUSH_DRAW() {
        return 'flush draw';
    }

}

function _calculateOuts(hand) {
    const straightOuts = straight(hand);
    const flushOuts = flush(hand);
    const fullHouseOuts = fullHouse(hand);

    drawTypes = {
        straight: !!straightOuts,
        flush: !!flushOuts,
        fullHouse: !!fullHouseOuts
    };

    return straightOuts + flushOuts + fullHouseOuts;
}



module.exports = DrawCombination;