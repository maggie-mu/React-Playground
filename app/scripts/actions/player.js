/**
 * Created by mmu on 12/12/2015.
 */

var Player = function () {
  this.audioCtx = new AudioContext();
  this.mode = null;
  this.currentKey = null;
  this.currentIndex = -1;
};

Player.prototype.play = function() {
  this.mode = 'play';
}

Player.prototype.pause = function() {
  this.mode = 'pause';
};

Player.prototype.finish = function() {
  this.currentKey = null;
  this.currentIndex = -1;
    this.mode = null;
}

Player.prototype.startNote = function(key, index) {
  this.currentKey = key;
  this.currentIndex = index || this.currentIndex;

  this.osc = this.audioCtx.createOscillator();
  this.osc.type = 'triangle';
  this.osc.frequency.value = key.frequency;
  this.osc.start(0);

  this.osc.connect(this.audioCtx.destination);
};

Player.prototype.finishNote = function() {
  this.osc.stop();
};

module.exports = new Player();
