var alt = require('../alt'),
    MusicSheets = require('../../config/musicSheets'),
    KeyboardActions = require('../actions/keyboardActions'),
    PianoActions = require('../actions/pianoActions');

class KeyboardStore {
  constructor() {

     this.state = {
       isSelected: false
     }
     this.bindListeners({
       handleKeyPress: [KeyboardActions.onKeyPress, PianoActions.onKeyPress],
       handleKeyUp: [KeyboardActions.onKeyUp, PianoActions.onKeyUp]
     });
  }

  handleKeyPress() {
    this.setState({isSelected: true})
  }

  handleKeyUp() {
    this.setState({isSelected: false})
  }
}

module.exports = alt.createStore(KeyboardStore, 'KeyboardStore');
