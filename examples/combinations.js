const { Pack, Hand } = require('../');

const pack = new Pack();

const royalFlushCards = [
    pack.createCard('clubs', 10),
    pack.createCard('clubs', 'J'),
    pack.createCard('clubs', 'Q'),
    pack.createCard('clubs', 'K'),
    pack.createCard('clubs', 'A')
];
const royalFlushHand = new Hand(royalFlushCards);

const straightFlushCards = [
    pack.createCard('diamonds', 9),    
    pack.createCard('diamonds', 10),
    pack.createCard('diamonds', 'J'),
    pack.createCard('diamonds', 'Q'),
    pack.createCard('diamonds', 'K')
];
const straightFlushHand = new Hand(straightFlushCards);

console.log('royalFlushHand has Royal Flush:', royalFlushHand.isRoyalFlush());
console.log('straightFlushHand has Royal Flush:', straightFlushHand.isRoyalFlush());

const royalFlushHigher = royalFlushHand.compare(straightFlushHand) === 1;
console.log('Royal flush is higher than just straight flush:', royalFlushHigher);