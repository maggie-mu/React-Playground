var alt = require('../alt'),
    PianoActions = require('../actions/pianoActions'),
    KeyboardActions = require('../actions/keyboardActions'),
    MusicSheets = require('../../config/musicSheets'),
    Keynotes = require('../../config/keynotes');

class PianoStore {
  constructor() {
    this.state = {
      keynotes: Keynotes,
      isPlaying: false,
      musicList: MusicSheets,
      currentIndex: 0,
      currentMusic: MusicSheets[0]
    };

    this.bindListeners({
      handlePlayMusic: PianoActions.playMusic,
      handlePauseMusic: PianoActions.pauseMusic,
      handleKeyPress: [KeyboardActions.onKeyPress, PianoActions.onKeyPress],
      handleKeyUp: [KeyboardActions.onKeyUp, PianoActions.onKeyUp]
    });
  }

  updateSelectedKeyNotes(key, isSelected) {
    for(var i=0; i<this.state.keynotes.length; i++ ) {
      if(key.id === this.state.keynotes[i].id) {
        this.state.keynotes[i].isSelected = isSelected;
      }
    }
  }

  handlePlayMusic(options) {
    this.setState({
       isPlaying: true,
       currentMusic: MusicSheets[options.currentIndex],
       currentIndex: options.currentIndex
    })
  }

  handlePauseMusic(options) {
    this.setState({
      isPlaying: false
    })
  }

  handleKeyPress(key) {
    if(key) {
      this.updateSelectedKeyNotes(key, true);
      this.setState({keynotes: this.state.keynotes});
    }
  }

  handleKeyUp(key) {
    if(key) {
      this.updateSelectedKeyNotes(key, false);
      this.setState({keynotes: this.state.keynotes});
    }
  }
}

module.exports = alt.createStore(PianoStore, 'PianoStore');
