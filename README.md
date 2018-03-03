
# Texas Holdem Poker
This is the module for creating own Texas Holdem poker game! It allows you to track cards, compose hands, compare hands by combination and even calculate draw combinations.
# Usage

    const { Pack, Hand } = require('tx-holdem');

	const pack = new Pack();
	
	const pairHand = new Hand(
		pack.createCard('clubs', 3),
		pack.createCard('diamonds', 3)
	);
	const fourOfAKindHand = new Hand(
		pack.createCard('clubs', 4),
		pack.createCard('diamonds', 4),
		pack.createCard('hearts', 4),
		pack.createCard('spades', 4),
	);

	const pairIsLower = pairHand.compare(fourOfAKind) === -1;
	console.log('Pair is lower than four of a kind:', pairIsLower);
# API
## Pack
### Pack()
#### new Pack()
### Members

#### (readonly) count: Number

Count of created cards in pack
### Methods

#### createCard() → {Card}
Creates random card

#### createCard(suit, value) → {Card}
Creates card with given suit and value
##### Parameters:
 - suit: String
 - value: String | Number
 - 
#### createCards(count) → {Array}
Create specified number of random cards
##### Parameters:
 - count: Number
 
#### destroy()
Clear pack

#### has(card) → {Boolean}
Checks whether card exists in current Pack
##### Parameters:
 - card: Card

#### has(suit, value) → {Boolean}
Checks whether card exists in current Pack
##### Parameters:
- suit: String
- value: String | Number

## Hand
### Hand()
#### new Hand()
### Hand(…cards)
#### new Hand(…cards)

### Members

#### (readonly) combination: Combination

#### (readonly) drawCombination: DrawCombination

### Methods

#### addCard(card) → {Boolean}
Add single card to hand
##### Parameters:
 - card: Card

#### addCards(cards) → {Boolean}
Add given cards to hand
##### Parameters:
 - cards: Array\<Cards\>

#### compare(hand) → {Number}
Compares combinations of current hand with given
##### Parameters:
 - hand: Hand

#### every(predicate)
Apply every matcher to underlying cards array
##### Parameters:
 - predicate: Function

#### forEach(aggregate)
Apply aggregator to each card in underlying cards array
##### Parameters:
 - aggregate: Function

#### has(card) → {Boolean}
Checks whether card exists in current hand
##### Parameters:
 - card: Card

#### has(suit, value) → {Boolean}
Checks whether card exists in current hand
##### Parameters:
 - suit: Number
 - value: Number

#### isFlush() → {Boolean}
Returns true if hand has flush

#### isFourOfKind() → {Boolean}
Returns true if hand has four of a kind

#### isFull() → {Boolean}
Return true if hand has reached maximum capacity

#### isFullHouse() → {Boolean}
Returns true if hand has full house

#### isKicker() → {Boolean}
Returns true if hand has nothing but kicker card

#### isPair() → {Boolean}
Returns true if hand has pair

#### isRoyalFlush() → {Boolean}
Returns true if hand has royal flush

#### isStraight() → {Boolean}
Returns true if hand has straight

#### isStraightFlush() → {Boolean}
Returns true if hand has straight flush

#### isThreeOfKind() → {Boolean}
Returns true if hand has three of a kind

#### isTwoPairs() → {Boolean}
Returns true if hand has two pairs

#### reduce(aggregate, start)
Apply reduce aggregator to underlying cards array
##### Parameters:
 - aggregate: Function
 - start: *

#### sort(order)
Sort cards in hand
##### Parameters:
 - order: String ASC or DESC
