var alt = require('../alt');
var Player = require('./Player');

class KeyboardAction {
  onKeyPress(key) {
    Player.startNote(key);
    return key
  }

  onKeyUp(key) {
    Player.finishNote();
   return key
  }

}

module.exports = alt.createActions(KeyboardAction);
