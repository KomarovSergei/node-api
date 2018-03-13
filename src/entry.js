// () => {}

function API() {
  this.url = 'http://google.com';

}

// API.prototype.get = function () {
//   return [1, 2, 3].map(function (number) {
//     console.log('this', this);
//     return number;
//   }.bind(this))
// }

// API.prototype.get = function () {
//   const self = this;
//   return [1, 2, 3].map(function (number) {
//     console.log('this', self);
//     return this;
//   })
// }

// API.prototype.get = function () {
//   return [1, 2, 3].map(number => console.log('this', this));
// }

// var api = new API();
// api.get();

// var getTrack = function (artist, track) {
//   console.log(arguments);
//   return artist + ' ' + track;
// }

var getTrack = function (...args) {
  console.log(args);
  return args[0] + ' ' + args[1];
}

console.log(getTrack('Artist', 'Track'));
