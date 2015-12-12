"use strict";
var React = require('react'),
    classNames = require('classnames'),
    connectToStores = require('../../../../node_modules/alt/utils/connectToStores'),
    PianoActions = require('../../actions/pianoActions'),
    PianoStore = require('../../store/pianoStore'),
    Keyboard = require('./keyboard');

var Piano = React.createClass({
  statics: {
    getStores() {
      return [PianoStore]
    },
    getPropsFromStores() {
      return PianoStore.getState()
    }
  },

  handleStop: function() {
     PianoActions.stopMusic(this.props.currentMusic, this.props.currentIndex);
  },

  handlePlay: function() {
     PianoActions.playMusic(this.props.currentMusic, this.props.currentIndex);
  },

  render: function() {
    return (<div className="piano">
              <div className="piano-control-panel">
                  <div className="piano-control-panel-screen col-sm-3">{this.props.currentMusic.name}</div>
                  <button className="btn btn-step" onClick={this.handleStop}><span className="glyphicon glyphicon glyphicon-step-backward"></span></button>
                  <button className="btn btn-play" onClick={this.handlePlay}>
                      { this.props.isPlaying? <span className="glyphicon glyphicon-stop"></span>: <span className="glyphicon glyphicon-play"></span>}
                  </button>
                  <button className="btn btn-step"><span className="glyphicon glyphicon glyphicon-step-forward"></span></button>
              </div>
              <Keyboard keys={this.props.keynotes}></Keyboard>
           </div>)
  }
});

module.exports = connectToStores(Piano);
