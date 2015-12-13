var alt = require('../alt');
var Player = require('./Player');

class KeyboardAction {
  onKeyPress(key) {
    Player.start(key);
    return {key}
  }

  onKeyUp(key) {
    Player.finish();
    return {key}
  }

}

module.exports = alt.createActions(KeyboardAction);
