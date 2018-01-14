const assert = require('assert');
const Card = require('../card');
const Hand = require('../hand');
const DrawCombination = require('../draw-combination');
const HandBuilder = require('./dataBuilder/HandDataBuilder');

describe('Draw combination', () => {
    describe('Straight draw', () => {
        describe('No chances', () => {
            it('Random cards', () => {
                const hand = new HandBuilder().withDifferentSuits('deuce', 'five', 'seven', 'nine', 'ace').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 0);
            });

            it('Sequence of 3 cards, 2 necessary are missing for straight', () => {
                const hand = new HandBuilder().withDifferentSuits('four', 'five', 'six', 'nine', 'jack').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 0);
            });

            it('Seems like gutshot but it is not', () => {
                const hand = new HandBuilder().withDifferentSuits('deuce', 'three', 'six', 'ace').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 0);
            });

            it('Three cards', () => {
                const hand = new HandBuilder().withDifferentSuits('deuce', 'four', 'five').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 0);
            });
        });

        describe('Two side straight draw', () => {
            it('Common two side, five or ten is missing', () => {
                const hand = new HandBuilder().withDifferentSuits('six', 'seven', 'eight', 'nine').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 8);
            });

            it('Common two side, ace or nine is missing', () => {
                const hand = new HandBuilder().withDifferentSuits('ten', 'jack', 'queen', 'king').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 8);
            });

            it('Edge variant, ace or six is missing', () => {
                const hand = new HandBuilder().withDifferentSuits('deuce', 'three', 'four', 'five').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 8);
            });
        });

        describe('One side straight draw', () => {
            it('Highest straight, ten is missing', () => {
                const hand = new HandBuilder().withDifferentSuits('deuce', 'jack', 'queen', 'king', 'ace').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });

            it('Lowest straight, five is missing', () => {
                const hand = new HandBuilder().withDifferentSuits('deuce', 'three', 'four', 'six', 'ace').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });
        });

        describe('Gutshot straight draw', () => {
            it('Common gutshot, second card (jack) in sequence is missing', () => {
                const hand = new HandBuilder().withDifferentSuits('ten', 'king', 'queen', 'ace').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });

            it('Common gutshot, second card (jack) in sequence is missing in hand with 5 cards', () => {
                const hand = new HandBuilder().withDifferentSuits('seven', 'ten', 'king', 'queen', 'ace').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });
            
            it('Common gutshot, third card (four) is missing', () => {
                const hand = new HandBuilder().withDifferentSuits('deuce', 'three', 'five', 'six').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });

            it('Common gutshot, fourth card (ten) is missing', () => {
                const hand = new HandBuilder().withDifferentSuits('seven', 'eight', 'nine', 'jack').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });

            it('Common gutshot, fourth card (ten) is missing in hand with 5 cards', () => {
                const hand = new HandBuilder().withDifferentSuits('seven', 'eight', 'nine', 'jack', 'ace').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });

            it('Common gutshot, one random card by right', () => {
                const hand = new HandBuilder().withDifferentSuits('six', 'eight', 'nine', 'ten', 'ace').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });
            
            it('Common gutshot, one random card by left', () => {
                const hand = new HandBuilder().withDifferentSuits('deuce', 'eight', 'nine', 'ten', 'queen').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });
        });
    });

    describe('Flush draw', () => {
        it('No chances', () => {
            const hand = new HandBuilder().withDifferentSuits('deuce', 'king', 'four', 'ten', 'seven').build();
            const draw = new DrawCombination(hand);
            assert.equal(draw.outs, 0);
        });

        it('Flush draw, 5 cards', () => {
            const hand = new HandBuilder().withCardsOfClubs('deuce', 'king', 'four', 'ten').withCardsOfSpades('seven').build();
            const draw = new DrawCombination(hand);
            assert.equal(draw.outs, 4);
        });

        it('Flush draw, 4 cards', () => {
            const hand = new HandBuilder().withCardsOfClubs('deuce', 'king', 'four', 'ten').build();
            const draw = new DrawCombination(hand);            
            assert.equal(draw.outs, 4);
        });
    });

    describe('Straight and flush draw', () => {
        it('Two side straight draw + flush draw', () => {
            const hand = new HandBuilder().withCardsOfClubs('deuce', 'four', 'five', 'seven').withCardsOfSpades('three').build();
            const draw = new DrawCombination(hand);            
            assert.equal(draw.outs, 12);
        });

        it('One side straight draw + flush draw', () => {
            const hand = new HandBuilder().withCardsOfClubs('deuce', 'four', 'six', 'ace').withCardsOfSpades('three').build();
            const draw = new DrawCombination(hand);            
            assert.equal(draw.outs, 8);
        });

        it('Gutshot straight draw + flush draw', () => {
            const hand = new HandBuilder().withCardsOfClubs('deuce', 'four', 'six', 'ten').withCardsOfSpades('three').build();
            const draw = new DrawCombination(hand);            
            assert.equal(draw.outs, 8);
        });
    });

    describe('Full house', () => {
        it('Three of a kind in hand, hand size = 5', () => {
            const hand = new HandBuilder().withDifferentSuits('nine', 'nine', 'nine', 'deuce', 'five').build();
            const draw = new DrawCombination(hand);
            assert.equal(draw.outs, 6);
        });
        
        it('Three of a kind in hand, hand size = 4', () => {
            const hand = new HandBuilder().withDifferentSuits('nine', 'nine', 'nine', 'deuce').build();
            const draw = new DrawCombination(hand);
            assert.equal(draw.outs, 3);
        });
        
        it('Two pairs', () => {
            const hand = new HandBuilder().withDifferentSuits('nine', 'nine', 'deuce', 'deuce', 'five').build();
            const draw = new DrawCombination(hand);
            assert.equal(draw.outs, 4);
        });
    });
});