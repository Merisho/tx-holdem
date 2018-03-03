const Card = require('../card');
const straightOuts = require('./straight');
const flush = require('./flush');
const fullHouse = require('./full-house');

const straight = straightOuts(Card);

class DrawCombination {
    constructor(hand) {
        this._hand = hand;
        this._outs = null;
        this._type = null;

        this._draws = {
            straight: false,
            flush: false,
            fullHouse: false
        };
    }

    get outs() {
        if(!this._outs) {
            return this._outs = this._calculateOuts();
        }

        return this._outs;
    }

    get type() {
        if(!this._outs) {
            this._outs = this._calculateOuts();
        }

        if(this._draws.fullHouse) {
            return DrawCombination.FULL_HOUSE_DRAW;
        } else if(this._draws.flush) {
            return DrawCombination.FULL_HOUSE;
        } else if(this._draws.straight) {
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

    _calculateOuts() {
        const straightOuts = straight(this._hand);
        const flushOuts = flush(this._hand);
        const fullHouseOuts = fullHouse(this._hand);
    
        this._draws = {
            straight: !!straightOuts,
            flush: !!flushOuts,
            fullHouse: !!fullHouseOuts
        };
    
        return straightOuts + flushOuts + fullHouseOuts;
    }
}

module.exports = DrawCombination;