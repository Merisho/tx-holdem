class Utils {
    static combinationCardsByValue(hand) {
        const cardsByVal = Utils.groupByValue(hand.cards);
        
        let combinationCards = [];
    
        for(let val in cardsByVal) {
            const similarValuesCount = cardsByVal[val].length;
            if(similarValuesCount > 1) {
                combinationCards = combinationCards.concat(cardsByVal[val]);
            }
        }
    
        return combinationCards;
    }

    static groupByValue(cards = []) {
        const cardsByValue = {};

        cards.forEach(c => {
            if (!cardsByValue[c.value]) {
                cardsByValue[c.value] = [];
            }

            cardsByValue[c.value].push(c);
        });

        return cardsByValue;
    }

    static getMostValuableFullHouseCardValue(cards) {
        const valuesCount = Utils.countSameValues(cards);
        const values = Object.keys(valuesCount);

        return valuesCount[values[0]] === 3 ? values[0] : values[1];
    }

    static countSameValuesToArray(cards = []) {
        return Object.values(Utils.countSameValues(cards));
    }

    static countSameValues(cards = []) {
        const valueCountMap = {};

        cards.forEach(c => {
            if(valueCountMap[c.value]) {
				valueCountMap[c.value]++;
			} else {
				valueCountMap[c.value] = 1;
			}
        });

        return valueCountMap;
    }
}

module.exports = Utils;