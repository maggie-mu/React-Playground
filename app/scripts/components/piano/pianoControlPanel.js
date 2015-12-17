"use strict";
var React = require('react'),
  classNames = require('classnames'),
  connectToStores = require('../../../../node_modules/alt/utils/connectToStores'),
  PianoControlPanelActions = require('../../actions/pianoControlPanelActions'),
  PianoControlPanelStore = require('../../store/pianoControlPanelStore'),
  Keyboard = require('./keyboard'),
  MusicNotes = require('./musicNotes');

var PianoControlPanel = React.createClass({
  statics: {
	getStores() {
	  return [PianoControlPanelStore]
	},
	getPropsFromStores() {
	  return PianoControlPanelStore.getState()
	}
  },

  handleMusicPlayer: function() {
	var currentMusic = this.props.musicList[this.props.currentMusicIndex];
	if(this.props.isPlaying) {
	  PianoControlPanelActions.pauseMusic(currentMusic, this.props.currentMusicIndex);
	} else {
	  PianoControlPanelActions.playMusic(currentMusic, this.props.currentMusicIndex);
	}
  },

  handleNextMusic: function() {
	//loop the music
	var currentMusicIndex = this.props.currentMusicIndex,
	    nextIndex = ( currentMusicIndex < this.props.musicList.length - 1) ? currentMusicIndex + 1: 0;
	PianoControlPanelActions.nextMusic(this.props.musicList[nextIndex], nextIndex);
  },

  handlePreviousMusic: function() {
	var currentMusicIndex = this.props.currentMusicIndex,
	  previousIndex = currentMusicIndex === 0 ? (this.props.musicList.length - 1): currentMusicIndex - 1;
	PianoControlPanelActions.previousMusic(this.props.musicList[previousIndex], previousIndex);
  },

  render: function() {
	var musicName = this.props.musicList[this.props.currentMusicIndex].name;

	return (<div className="piano-control-panel">
	  <div className="piano-control-panel-screen col-sm-6">
		<span>{musicName}</span>
	  </div>
	  <div className="piano-control-panel-actions">
		<button className="btn btn-step" onClick={this.handlePreviousMusic}>
				  <span className="glyphicon glyphicon-step-backward">
				</span></button>
		<button className="btn btn-play" onClick={this.handleMusicPlayer}>
		  { this.props.isPlaying? <span className="glyphicon glyphicon-stop"></span>:<span className="glyphicon glyphicon-play"></span>}
		</button>
		<button className="btn btn-step">
		  <span className="glyphicon glyphicon-step-forward" onClick={this.handleNextMusic}></span>
		</button>
	  </div>
	</div>);
  }
});

module.exports = connectToStores(PianoControlPanel);
