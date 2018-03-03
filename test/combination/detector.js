const assert = require('assert');

const HandBuilder = require('../dataBuilder/HandDataBuilder');
const detector = require('../../src/combination/detector');

describe('Combination detector', () => {
    it('Should NOT detect full house as three of a kind', () => {
        const fullHouseCards = new HandBuilder().withDifferentSuits(6, 6, 6, 9, 9).build().cards;
        
        assert.equal(detector.isThreeOfAKind(fullHouseCards), false);
    });

    it('Should NOT detect full house as pair', () => {
        const fullHouseCards = new HandBuilder().withDifferentSuits(6, 6, 6, 9, 9).build().cards;
        
        assert.equal(detector.isPair(fullHouseCards), false);
    });
});