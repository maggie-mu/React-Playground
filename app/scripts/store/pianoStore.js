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
      handlePlayMusic: PianoActions.playMusic,
      handlePauseMusic: PianoActions.pauseMusic
    });
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
}

module.exports = alt.createStore(PianoStore, 'PianoStore');
