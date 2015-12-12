var alt = require('../alt');
var Keynotes = require('../../config/keynotes');
var Player = require('./Player');

var getKey = function(keyID) {
  for(var i=0; i<Keynotes.length; i++) {
    if(Keynotes[i].id === keyID) {
      return Keynotes[i];
    }
  }
  return undefined;
}

class PianoActions {
  constructor() {
    this.generateActions(
      'onKeyPress',
      'onKeyUp'
    )
  }

  playMusic(currentMusic, currentIndex) {
    var key, stopTimeout, actions = this.actions;

    function playMusic(keyId, i) {
        key = getKey(keyId);
        key.isSelected = true;
        Player.start(key);
        actions.onKeyPress(key);

        stopTimeout = setTimeout(function () {
          key.isSelected = false;
          Player.stop(key);
          actions.onKeyUp(key);

          if (i < currentMusic.notes.length -1) {
            playMusic(currentMusic.notes[i + 1].note, i + 1);
          }
        }, 500);
    }

    playMusic(currentMusic.notes[0].note, 0);
    return {currentIndex};
  }

  stopMusic(currentMusic, currentIndex) {
    return {currentIndex};
  }

}
module.exports = alt.createActions(PianoActions);
