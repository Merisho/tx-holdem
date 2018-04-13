class Utils {
    static combinationCardsByRank(hand) {
        const cardsByRank = Utils.groupByRank(hand.cards);
        
        let combinationCards = [];
    
        for(let val in cardsByRank) {
            const similarRanksCount = cardsByRank[val].length;
            if(similarRanksCount > 1) {
                combinationCards = combinationCards.concat(cardsByRank[val]);
            }
        }
    
        return combinationCards;
    }

    static groupByRank(cards = []) {
        const cardsByRank = {};

        cards.forEach(c => {
            if (!cardsByRank[c.rank]) {
                cardsByRank[c.rank] = [];
            }

            cardsByRank[c.rank].push(c);
        });

        return cardsByRank;
    }

    static getMostValuableFullHouseCardRank(cards) {
        const ranksCount = Utils.countSameRanks(cards);
        const ranks = Object.keys(ranksCount);

        return ranksCount[ranks[0]] === 3 ? ranks[0] : ranks[1];
    }

    static countSameRanksToArray(cards = []) {
        return Object.values(Utils.countSameRanks(cards));
    }

    static countSameRanks(cards = []) {
        const rankCountMap = {};

        cards.forEach(c => {
            if(rankCountMap[c.rank]) {
				rankCountMap[c.rank]++;
			} else {
				rankCountMap[c.rank] = 1;
			}
        });

        return rankCountMap;
    }
}

module.exports = Utils;