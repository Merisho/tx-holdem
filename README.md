
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

	const pairIsLower = pairHand.compare(fourOfAKindHand) === -1;
	console.log('Pair is lower than four of a kind:', pairIsLower);
# API
## Card
- constructor(suit, value)
	- suit: number
	- value: number

Methods:
- static create(suit, value): Card|null — creates Card instance, returns null is suit or value is not a number
	- suit: number
	- value: number
- toString(): string — returns string representation of card
- toJSON(): object — returns JSON representation of card
- valueOf(): number — returns value representation of card (card.value property)
- compare(card): number — compares current card with given by value, returns 1 if current is higher; -1 if current is lower; 0 if equal
	- card: Card
- equalBySuit(card): boolean — compares cards by suit
	- card: Card
- equalByValue(card): boolean — compares cards by value
	- card: Card
- isAce(): boolean — returns true if card is ace

Properties:
- suit: number
- rank: number
- static readonly CLUBS: number
- static readonly DIAMONDS: number
- static readonly HEARTS: number
- static readonly SPADES: number
- static readonly SUIT_MAX: number — constant value of max suit (spades)
- static readonly TWO: number
- static readonly THREE: number
- static readonly FOUR: number
- static readonly FIVE: number
- static readonly SIX: number
- static readonly SEVEN: number
- static readonly EIGHT: number
- static readonly NINE: number
- static readonly TEN: number
- static readonly JACK: number
- static readonly QUEEN: number
- static readonly KING: number
- static readonly ACE: number
- static readonly VALUE_MAX: number — constant value of max rank (ace)

## Hand
- constructor(...cards)
	- ...cards: Card — enumeration or array of cards

Methods:
- addCards(...cards): boolean — adds multiple cards to hand
	- ...cards: Card — enumeration or array of cards
- addCard(card): boolean — adds single card to hand
	- card: Card
- isFull(): boolean — returns true if had has reached maximum capacity
- has(card): boolean — returns true if had as given card
	- card: Card
- has(suit, value): boolean — returns true if hand has card with given suit and value
	- suit: number
	- value: number
- compare(hand): number — returns -1 if current had has lower combination, 0 if hands are equal, 1 if hand is greater
	- hand: Hand
- isKicker(): boolean
- isPair(): boolean
- isTwoPairs(): boolean
- isThreeOfKind(): boolean
- isStraight(): boolean
- isFlush(): boolean
- isFullHouse(): boolean
- isFourOfKind(): boolean
- isStraightFlush(): boolean
- isRoyalFlush(): boolean 
- reduce(aggregate, start): any — applies aggregate function to each card in hand and returns single value; works in the same way as Array.reduce
	- aggregate: function
	- start: any
- sort(order): undefined — sorts cards in hand by given order
	- order: string — "asc" by default
- every(predicate): boolean — returns true if every card matches given predicate function
	- predicate: function
- forEach(aggregate): undefined — applies aggregate function to each card in hand

Properties:
- readonly combination: Combination
- readonly drawCombination: DrawCombination
- readonly size: number
- readonly lastCard: Card
- readonly firstCard: Card
- static readonly MAX_HAND_SIZE