import GameEngine from '#/core/core';
import Vector from '#/core/vector';
import { Group } from '#/display/group';
import { Rectangle, Circle } from '#/display/shapes/index';
import * as utils from '#/utils';
// import keyboardEvents from './components/keyboardEvents.js';
window.game2d = {
    App: GameEngine,
    shapes: {
        Rect: Rectangle,
        Circle: Circle,
    },
    Group: Group,
    Vector: Vector,
    utils: utils,
};
//# sourceMappingURL=index.js.map