"use strict";
var React = require('react'),
    classNames = require('classnames'),
    connectToStores = require('../../../../node_modules/alt/utils/connectToStores'),
    PianoStore = require('../../store/pianoStore'),
    Keyboard = require('./keyboard'),
    MusicNotes = require('./musicNotes'),
    PianoControlPanel = require('./pianoControlPanel');

var Piano = React.createClass({
  statics: {
    getStores() {
      return [PianoStore]
    },
    getPropsFromStores() {
      return PianoStore.getState()
    }
  },

  render: function() {
    return (<div>
              <MusicNotes keynotes={this.props.keynotes}></MusicNotes>
              <div className="piano">
                  <PianoControlPanel musicName={this.props.currentMusic.name}/>
                  <Keyboard keynotes={this.props.keynotes}></Keyboard>
               </div>
            </div>)
  }
});

module.exports = connectToStores(Piano);
