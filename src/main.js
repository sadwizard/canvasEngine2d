import { Vec } from './components/Vector.js';
import Engine from './components/Engine.js';
import utils from './components/utils.js';
import keyboardEvents from './components/keyboardEvents.js';

function CanvasEngine(canvasEl, width, height, backgroundColor) {
  this.canvas = canvasEl;
  this.ctx = canvasEl.getContext('2d');
  this.canvas.width = width;
  this.canvas.height = height;
  this.canvas.style.backgroundColor = backgroundColor;
  this.vars = {
    w: width,
    h: height,
    wh: width / 2,
    hh: height / 2,
  };


  this.utils = utils;
  this.Vec = Vec;
  this.Engine = new Engine(this.ctx, { w: width, h: height });
  this.keyboardEvents = new keyboardEvents();
  this.ctx.globalAlpha = 1;
}

window.CanvasEngine = CanvasEngine;