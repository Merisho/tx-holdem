const Card = require('../card');
const utils = require('./utils');

class Detector {
    static isFlush(cards) {
        if(!cards || cards.length !== 5) {
            return false;
        }
    
        const suit = cards[0].suit;
        return cards.every(card => card.suit === suit);
    }

    static isStraight(cards) {
        if(!cards || cards.length !== 5) {
            return false;
        }
    
        const maxIndex = cards.length - 1;
        let isStraight = true;
        for(let i = 0; i < maxIndex - 1; i++) {
            if(cards[i + 1] - cards[i] !== 1) {
                isStraight = false;
                break;
            }
        }
        if(isStraight) {
            const last = cards[maxIndex];
            const penult = cards[maxIndex - 1];
            isStraight = (last.rank === Card.ACE && penult.rank === Card.FIVE) || last - penult === 1;
        }
        
        return isStraight;
    }

    static isFourOfAKind(cards) {
        return utils.countSameRanksToArray(cards).includes(4);
    }

    static isFullHouse(cards) {
        const similarCount = utils.countSameRanksToArray(cards);
        return similarCount.includes(2) && similarCount.includes(3);
    }

    static isThreeOfAKind(cards) {
        return utils.countSameRanksToArray(cards).includes(3) && !Detector.isPair(cards) && !Detector.isFullHouse(cards);
    }

    static isTwoPairs(cards) {
        const similarCount = utils.countSameRanksToArray(cards);
        const firstIndex = similarCount.indexOf(2);
    
        return firstIndex !== similarCount.lastIndexOf(2) && firstIndex !== -1;
    }

    static isPair(cards) {
        const sameRanks = utils.countSameRanksToArray(cards);
        return sameRanks.includes(2) && !sameRanks.includes(3) && !Detector.isTwoPairs(cards);
    }
}

module.exports = Detector;