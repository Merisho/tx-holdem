let dir = 'src';

// For browser build
if (typeof process !== 'undefined' && process.type === 'renderer') {
    dir = 'compiled';
}

module.exports = {
    Hand: require(`./${dir}/hand`),
    Pack: require(`./${dir}/pack`),
    HandsCollection: require(`./${dir}/hands-collection`),
    Combination: require(`./${dir}/combination`),
    DrawCombination: require(`./${dir}/draw-combination`),
    Card: require(`./${dir}/card`)
};