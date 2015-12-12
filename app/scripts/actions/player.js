/**
 * Created by mmu on 12/12/2015.
 */

var Player = function () {
  this.audioCtx = new AudioContext();
};

Player.prototype.start = function(key) {
  this.osc = this.audioCtx.createOscillator();
  this.osc.type = 'triangle';
  this.osc.frequency.value = key.frequency;
  this.osc.start(0);

  this.osc.connect(this.audioCtx.destination);
};

Player.prototype.stop = function(key) {
  this.osc.stop();
};


module.exports = new Player();