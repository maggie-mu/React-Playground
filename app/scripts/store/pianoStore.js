var alt = require('../alt'),
    PianoActions = require('../actions/pianoActions'),
    MusicSheets = require('../../config/musicSheets'),
    Keynotes = require('../../config/keynotes');

class PianoStore {
  constructor() {
    this.state = {
      keynotes: Keynotes,
      isPlaying: false,
      currentIndex: 0,
      currentMusic: MusicSheets[0]
    }

    this.bindListeners({
      handlePlayMusic: PianoActions.playMusic
    });
  }

  handlePlayMusic(options) {
    this.setState({
       isPlaying: !this.isPlaying,
       currentMusic: MusicSheets[options.currentIndex],
       currentIndex: options.currentIndex
    })
  }
}

module.exports = alt.createStore(PianoStore, 'PianoStore');
