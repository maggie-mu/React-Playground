"use strict";

var React = require('react'),
    classNames = require('classnames'),
    connectToStores = require('../../../../node_modules/alt/utils/connectToStores'),
    KeyboardActions = require('../../actions/keyboardActions'),
    KeyboardStore = require('../../store/KeyboardStore')

var MusicNote = connectToStores(React.createClass({
  statics: {
    getStores() {
      return [KeyboardStore]
    },
    getPropsFromStores() {
      return KeyboardStore.getState()
    }
  },

  propTypes: {
    settings: React.PropTypes.object
  },

  handleKeyUp: function(selectedKey) {
    return function() {
      selectedKey.isSelected = false;
      KeyboardActions.onKeyUp(selectedKey);
    }
  },

  handleKeyPress: function(selectedKey) {
    return function() {
      selectedKey.isSelected = true;
      KeyboardActions.onKeyPress(selectedKey);
    }
  },

  render: function() {
    var keyClassName = classNames('note', this.props.settings.type, {
      'active': this.props.settings.isSelected
    });
    var imgUrl = this.props.settings.direction && this.props.settings.direction === 'up'? '../../../images/full-note-down.svg': '../../../images/full-note-up.svg';

    return (<li className={keyClassName}>
              {this.props.settings.type === 'whiteKey'?
                 <img className={this.props.settings.label} src={imgUrl}></img>: undefined
              }
            </li>)
  }
}));

var MusicNotes = React.createClass({
  propTypes: {
    keynotes: React.PropTypes.array
  },

  render: function() {
    return (<div className='music-notes'>
              <ul className='music-notes-lines'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <ul className='music-notes-notes'>
                {this.props.keynotes.map(function(note){
                  return <MusicNote key={note.id} settings={note}></MusicNote>
                })}
              </ul>
            </div>)
  }
})

module.exports = MusicNotes;
