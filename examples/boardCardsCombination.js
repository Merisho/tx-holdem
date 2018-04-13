const { Pack, Hand, HandsCollection } = require('../');

const pack = new Pack();

const board = new Hand([
    pack.createCard('clubs', 5),
    pack.createCard('diamonds', 6),
    pack.createCard('spades', 8),
    pack.createCard('hearts', 2),
    pack.createCard('hearts', 9),
]);

const pocket = new Hand([
    pack.createCard('spades', 7),
    pack.createCard('spades', 9),
]);

const coll = HandsCollection.createCombinations(board, pocket);

console.log('Highest is', coll.highestCombination.name);
