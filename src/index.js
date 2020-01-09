import Core from './components/core.js';
import Vector from './components/vector.js';
import Rectangle from './components/shapes/rectangle.js';
import Circle from './components/shapes/circle.js';
import * as utils from './components/utils.js';
import keyboardEvents from './components/keyboardEvents.js';

window.game2d = {
    Init: Core,
    Rectangle, Circle,
    Vector,
    utils,
    keyboard: keyboardEvents
};
