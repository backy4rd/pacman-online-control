const readableMap = 
`w w w w w w w w w w w w w w w w w w w w w w w w w w w w 
w $ $ $ $ $ $ $ $ $ $ $ $ w w $ $ $ $ $ $ $ $ $ $ $ $ w 
w $ w w w w $ w w w w w $ w w $ w w w w w $ w w w w $ w 
w b w w w w $ w w w w w $ w w $ w w w w w $ w w w w b w 
w $ w w w w $ w w w w w $ w w $ w w w w w $ w w w w $ w 
w $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ w 
w $ w w w w $ w w $ w w w w w w w w $ w w $ w w w w $ w 
w $ w w w w $ w w $ w w w w w w w w $ w w $ w w w w $ w 
w $ $ $ $ $ $ w w $ $ $ $ w w $ $ $ $ w w $ $ $ $ $ $ w 
w w w w w w $ w w w w w $ w w $ w w w w w $ w w w w w w 
w w w w w w $ w w w w w $ w w $ w w w w w $ w w w w w w 
w w w w w w $ w w $ $ $ $ $ $ $ $ $ $ w w $ w w w w w w 
w w w w w w $ w w $ w w w . . w w w $ w w $ w w w w w w
w w w w w w $ w w $ w . . . . . . w $ w w $ w w w w w w
w . . . . . $ $ $ $ w . . . . . . w $ $ $ $ . . . . . w
w w w w w w $ w w $ w . . . . . . w $ w w $ w w w w w w
w w w w w w $ w w $ w w w w w w w w $ w w $ w w w w w w
w w w w w w $ w w $ $ $ $ $ $ $ $ $ $ w w $ w w w w w w 
w w w w w w $ w w $ w w w w w w w w $ w w $ w w w w w w 
w w w w w w $ w w $ w w w w w w w w $ w w $ w w w w w w
w $ $ $ $ $ $ $ $ $ $ $ $ w w $ $ $ $ $ $ $ $ $ $ $ $ w
w $ w w w w $ w w w w w $ w w $ w w w w w $ w w w w $ w
w b w w w w $ w w w w w $ w w $ w w w w w $ w w w w b w
w $ $ $ w w $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ w w $ $ $ w
w w w $ w w $ w w $ w w w w w w w w $ w w $ w w $ w w w
w w w $ w w $ w w $ w w w w w w w w $ w w $ w w $ w w w
w $ $ $ $ $ $ w w $ $ $ $ w w $ $ $ $ w w $ $ $ $ $ $ w
w $ w w w w w w w w w w $ w w $ w w w w w w w w w w $ w
w $ w w w w w w w w w w $ w w $ w w w w w w w w w w $ w
w $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ $ w
w w w w w w w w w w w w w w w w w w w w w w w w w w w w`;

//convert readableMap to 2dArray without <space>;
const map = readableMap
  .replace(/ /g, '')
  .split('\n')
  .map(row => row.split(''));


// let walls = [];
// let coins = [];
// let buffs = [];

// map.forEach((row, i) => row.forEach((unit, j) => {
//   if (unit === 'w') walls.push([i, j]);
// }))

// map.forEach((row, i) => row.forEach((unit, j) => {
//   if (unit === '$') coins.push([i, j]);
// }))

// map.forEach((row, i) => row.forEach((unit, j) => {
//   if (unit === 'b') buffs.push([i, j]);
// }))

module.exports = map;
