import Ticker from './ticker';
import Render from './render';
import Collision from '#/collisions/collision';
import { Piece } from '#/display/piece';
import { isNill, zIndexComporator } from '#/utils';
import Vector from './vector';
var GameEngine = /** @class */ (function () {
    function GameEngine(node, width, height, backgroundColor, settings) {
        var _a;
        if (isNill(node) || isNill(width) || isNill(height)) {
            throw 'Default param was missed!';
        }
        this.ctx = GameEngine.getContext2d(node);
        var FPS = 1000 / 60;
        this.canvas = node;
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.backgroundColor = backgroundColor !== null && backgroundColor !== void 0 ? backgroundColor : '#333';
        this.screen = {
            w: width,
            h: height,
            hw: width / 2,
            hh: height / 2,
        };
        this.ctx.globalAlpha = 1;
        this.objects = [];
        this.tickerUpdate = new Ticker(this.ctx, { FPS: FPS, tieRender: true });
        this.tickerRender = new Ticker(this.ctx, { tieRender: false });
        this.renderer = new Render(this.ctx);
        this.collisions = new Collision();
        this.globalGravity = (_a = settings === null || settings === void 0 ? void 0 : settings.globalGravity) !== null && _a !== void 0 ? _a : new Vector(0, 1);
        return this;
    }
    GameEngine.prototype.addBody = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.forEach(function (item) {
            if (item instanceof Piece) {
                _this.objects.push(item);
                _this.objects.sort(zIndexComporator);
            }
        });
        return this;
    };
    GameEngine.prototype.removeBody = function (id) {
        this.objects = this.objects.filter(function (item) { return item.id !== id; });
    };
    GameEngine.prototype.run = function () {
        var _this = this;
        var drawer = this.renderer.draw.bind(this);
        this.tickerRender.setUpdateFunc(function () {
            _this.ctx.clearRect(0, 0, _this.screen.w, _this.screen.h);
            _this.objects.forEach(function (item) {
                item.render(drawer);
            });
        });
        this.tickerUpdate.setUpdateFunc(function (dt) {
            // this.collisions.update(this.objects);
            var options = {
                globalGravity: _this.globalGravity,
            };
            _this.objects.forEach(function (item) {
                item.update(dt, options);
            });
        });
        this.tickerRender.start();
        this.tickerUpdate.start();
        return this;
    };
    GameEngine.prototype.stop = function () {
        this.tickerRender.stop();
        this.tickerUpdate.stop();
        return this;
    };
    GameEngine.prototype.print = function () {
        var drawer = this.renderer.draw.bind(this);
        this.ctx.clearRect(0, 0, this.screen.w, this.screen.h);
        this.objects.forEach(function (item) {
            item.render(drawer);
        });
        return this;
    };
    GameEngine.getContext2d = function (node) {
        try {
            var ctx = node.getContext('2d');
            if (!isNill(ctx)) {
                return ctx;
            }
            throw 'Get getContext("2d") error!';
        }
        catch (e) {
            throw 'Get getContext("2d") error!';
        }
    };
    return GameEngine;
}());
export default GameEngine;
//# sourceMappingURL=core.js.map