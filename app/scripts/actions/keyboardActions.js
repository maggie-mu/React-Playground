var alt = require('../alt');
var Player = require('./Player');

class KeyboardAction {
  onKeyPress(key) {
    Player.start(key);
    return {key}
  }

  onKeyUp(key) {
    Player.stop(key);
    return {key}
  }

}

module.exports = alt.createActions(KeyboardAction);
