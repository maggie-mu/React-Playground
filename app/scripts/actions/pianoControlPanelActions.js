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

var keyPlayingTimeout;

class PianoActions {

  constructor() {
    this.generateActions(
      'onKeyPress',
      'onKeyUp'
    )
  };

  playMusic(currentMusic, currentIndex) {
    var key,
        actions = this.actions;

    Player.play();

    function playMusic(keyId, i) {
       if(Player.mode === 'play') {
         key = getKey(keyId);
         key.isSelected = true;
         Player.startNote(key, i);
         actions.onKeyPress(key);

         keyPlayingTimeout = setTimeout(function () {
           key.isSelected = false;
           Player.finishNote();
           actions.onKeyUp(key);

           if (i < currentMusic.notes.length - 1) {
             setTimeout(function() {
               playMusic(currentMusic.notes[i + 1].note, i + 1);
             }, 100);
           } else {
             actions.pauseMusic(currentMusic, currentIndex);
             actions.stopCurrentMusic();
           }
         }, 400);
       }
    }

    if(Player.currentIndex > -1) {
      playMusic(Player.currentKey.id, Player.currentIndex);
    } else {
      playMusic(currentMusic.notes[0].note, 0);
    }
    return {currentIndex};
  };

  stopCurrentMusic() {
    this.actions.onKeyUp(Player.currentKey);
    Player.stop();
    clearTimeout(keyPlayingTimeout);
  };

  pauseMusic(currentMusic, currentIndex) {
    Player.finishNote();
    this.actions.onKeyUp(Player.currentKey);

    Player.pause();
    return {currentIndex};
  };

  nextMusic(nextMusic, nextIndex) {
    this.actions.stopCurrentMusic();
    this.actions.playMusic(nextMusic, nextIndex);
  };

  previousMusic(previousMusic, previousIndex) {
    this.actions.stopCurrentMusic();
    this.actions.playMusic(previousMusic, previousIndex);
  };

}
module.exports = alt.createActions(PianoActions);
