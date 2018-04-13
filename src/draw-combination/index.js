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
    }

    get outs() {
        if(!this._outs) {
            return this._outs = this._calculateOuts();
        }

        return this._outs;
    }

    _calculateOuts() {
        const straightOuts = straight(this._hand);
        const flushOuts = flush(this._hand);
        const fullHouseOuts = fullHouse(this._hand);
    
        return straightOuts + flushOuts + fullHouseOuts;
    }
}

module.exports = DrawCombination;