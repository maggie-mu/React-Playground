"use strict";
var React = require('react'),
    classNames = require('classnames'),
    connectToStores = require('../../../../node_modules/alt/utils/connectToStores'),
    PianoActions = require('../../actions/pianoActions'),
    PianoStore = require('../../store/pianoStore'),
    Keyboard = require('./keyboard'),
    MusicNotes = require('./musicNotes');

var Piano = React.createClass({
  statics: {
    getStores() {
      return [PianoStore]
    },
    getPropsFromStores() {
      return PianoStore.getState()
    }
  },

  handleMusicPlayer: function() {
     if(this.props.isPlaying) {
       PianoActions.pauseMusic(this.props.currentMusic, this.props.currentIndex);
     } else {
       PianoActions.playMusic(this.props.currentMusic, this.props.currentIndex);
     }
  },

  handleNextMusic: function() {
    //loop the music
    var currentIndex = this.props.currentIndex,
        nextIndex = ( currentIndex < this.props.musicList.length - 1) ? currentIndex + 1: 0;
    PianoActions.nextMusic(this.props.musicList[nextIndex], nextIndex);
  },

  handlePreviousMusic: function() {
    var currentIndex = this.props.currentIndex,
        previousIndex = currentIndex === 0 ? (this.props.musicList.length - 1): currentIndex - 1;
    PianoActions.previousMusic(this.props.musicList[previousIndex], previousIndex);
  },

  renderPianoControlPanel: function() {
    return (<div className="piano-control-panel">
              <div className="piano-control-panel-screen col-sm-6">
                <span>{this.props.currentMusic.name}</span>
              </div>
              <button className="btn btn-step" onClick={this.handlePreviousMusic}>
                <span className="glyphicon glyphicon-step-backward">
              </span></button>
              <button className="btn btn-play" onClick={this.handleMusicPlayer}>
                  { this.props.isPlaying? <span className="glyphicon glyphicon-stop"></span>:<span className="glyphicon glyphicon-play"></span>}
              </button>
              <button className="btn btn-step">
                  <span className="glyphicon glyphicon-step-forward" onClick={this.handleNextMusic}></span>
              </button>
            </div>);
  },

  render: function() {
    return (<div>
              <MusicNotes keynotes={this.props.keynotes}></MusicNotes>
              <div className="piano">
                  {this.renderPianoControlPanel()}
                  <Keyboard keynotes={this.props.keynotes}></Keyboard>
               </div>
            </div>)
  }
});

module.exports = connectToStores(Piano);
