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
         Player.startNote(key, i);
         actions.onKeyPress(key);

         stopTimeout = setTimeout(function () {
           key.isSelected = false;
           Player.finishNote();
           actions.onKeyUp(key);

           if (i < currentMusic.notes.length - 1) {
             playMusic(currentMusic.notes[i + 1].note, i + 1);
           } else {
             actions.pauseMusic(currentMusic, currentIndex);
             Player.finish();
           }
         }, 500);
       }
    }

    if(Player.currentIndex > -1) {
      playMusic(Player.currentKey.id, Player.currentIndex);
    } else {
      playMusic(currentMusic.notes[0].note, 0);
    }
    return {currentIndex};
  }

  pauseMusic(currentMusic, currentIndex) {
    Player.finishNote();
    this.actions.onKeyUp(Player.currentKey);

    Player.pause();
    return {currentIndex};
  }

}
module.exports = alt.createActions(PianoActions);
