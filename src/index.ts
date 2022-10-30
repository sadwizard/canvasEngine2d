import GameEngine from './components/core';
import Vector from './components/vector';
import { Rectangle, Circle } from './components/shapes/index';
import * as utils from './components/utils';
// import keyboardEvents from './components/keyboardEvents.js';


window.canvas2D = {
    App: GameEngine,
    shapes: {
        Rect: Rectangle,
        Circle,
    },
    Vector: Vector,
    utils,
};