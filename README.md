
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
- static readonly CLUBS: number — constant value of clubs suit
- static readonly DIAMONDS: number — constant value of diamonds suit
- static readonly HEARTS: number — constant value of hearts suit
- static readonly SPADES: number — constant value of spades suit
- static readonly SUIT_MAX: number — constant value of max suit (spades)
- static readonly TWO: number — constant value of 2 rank
- static readonly THREE: number — constant value of 3 rank
- static readonly FOUR: number — constant value of 4 rank
- static readonly FIVE: number — constant value of 5 rank
- static readonly SIX: number — constant value of 6 rank
- static readonly SEVEN: number — constant value of 7 rank
- static readonly EIGHT: number — constant value of 8 rank
- static readonly NINE: number — constant value of 9 rank
- static readonly TEN: number — constant value of 10 rank
- static readonly JACK: number — constant value of jack rank
- static readonly QUEEN: number — constant value of queen rank
- static readonly KING: number — constant value of king rank
- static readonly ACE: number — constant value of ace rank
- static readonly VALUE_MAX: number — constant value of max rank (ace)