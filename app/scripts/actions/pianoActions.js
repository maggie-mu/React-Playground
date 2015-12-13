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
};

class PianoActions {
  constructor() {
    this.generateActions(
      'onKeyPress',
      'onKeyUp'
    )
  }

  playMusic(currentMusic, currentIndex) {
    var key, stopTimeout, actions = this.actions;
    Player.play();

    function playMusic(keyId, i) {
       if(Player.mode === 'play') {
         key = getKey(keyId);
         key.isSelected = true;
         Player.start(key, i);
         actions.onKeyPress(key);

         stopTimeout = setTimeout(function () {
           key.isSelected = false;
           Player.finish();
           actions.onKeyUp(key);

           if (i < currentMusic.notes.length - 1) {
             playMusic(currentMusic.notes[i + 1].note, i + 1);
           }
           else {
             actions.stopMusic(currentMusic, currentIndex);
           }
         }, 500);
       }
    }
    if(Player.currentKey) {
      playMusic(Player.currentKey.id, Player.currentIndex);
    } else {
      playMusic(currentMusic.notes[0].note, 0);
    }
    return {currentIndex};
  }

  stopMusic(currentMusic, currentIndex) {
    Player.finish();
    this.actions.onKeyUp(Player.currentKey);

    Player.stop();
    return {currentIndex};
  }

}
module.exports = alt.createActions(PianoActions);
