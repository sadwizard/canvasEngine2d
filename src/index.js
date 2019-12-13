import Core from './components/core.js';
import Vector from './components/vector.js';
import Body from './components/body.js';
import * as utils from './components/utils.js';
import keyboardEvents from './components/keyboardEvents.js';

window.game2d = {
    Init: Core,
    Body: Body,
    Vector: Vector,
    utils: utils,
    keyboard: keyboardEvents
};
