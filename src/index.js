import Game2d from './components/core.js';
import Vector from './components/vector.js';
import Rectangle from './components/shapes/rectangle.js';
import Circle from './components/shapes/circle.js';
import * as utils from './components/utils.js';
import keyboardEvents from './components/keyboardEvents.js';

Game2d.shapes = {
  Circle: Circle,
  Rect: Rectangle,
}

Game2d.Vector = Vector;
Game2d.utils = utils;
Game2d.keyboardEvents = keyboardEvents;


window.Game2d = Game2d;
