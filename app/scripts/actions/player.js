/**
 * Created by mmu on 12/12/2015.
 */

var Player = function () {
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  this.audioCtx = new AudioContext();
  this.mode = null;
  this.currentKey = null;
  this.currentIndex = -1;
  this.oscMap = {};
};

Player.prototype.play = function() {
  this.mode = 'play';
}

Player.prototype.pause = function() {
  this.mode = 'pause';
};

Player.prototype.stop = function() {
  this.finishNote();
  this.currentKey = null;
  this.currentIndex = -1;
  this.mode = null;
  this.oscMap = {};

}

Player.prototype.startNote = function(key, index) {
  if(index) {
    this.currentKey = key;
    this.currentIndex = index || this.currentIndex;
  }

  var osc = this.audioCtx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = key.frequency;
  osc.start(0);

  osc.connect(this.audioCtx.destination);

  this.oscMap[key.id] = osc;
};

Player.prototype.finishNote = function(key) {
  var key = key || this.currentKey;
  if(this.oscMap[key.id]) {
    this.oscMap[key.id].stop(0);
    delete this.oscMap[key.id];
  }
};

module.exports = new Player();
