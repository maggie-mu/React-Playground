var alt = require('../alt'),
    PianoControlPanelActions = require('../actions/pianoControlPanelActions'),
    KeyboardActions = require('../actions/keyboardActions'),
    MusicSheets = require('../../config/musicSheets'),
    Keynotes = require('../../config/keynotes');

class PianoControlPanelStore {
  constructor() {
    this.state = {
      isPlaying: false,
      musicList: MusicSheets,
      currentMusicIndex: 0
    };

    this.bindListeners({
      handlePlayMusic: PianoControlPanelActions.playMusic,
      handlePauseMusic: PianoControlPanelActions.pauseMusic
    });
  }

  handlePlayMusic(options) {
    this.setState({
       isPlaying: true,
       currentMusicIndex: options.currentIndex
    })
  }

  handlePauseMusic(options) {
    this.setState({
      isPlaying: false
    })
  }
}

module.exports = alt.createStore(PianoControlPanelStore, 'PianoControlPanelStore');
