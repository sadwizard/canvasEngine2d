import { __extends } from "tslib";
import Vector from '#/core/vector';
import { isNill } from '#/utils';
import { Piece } from './piece';
var V = Vector;
var Body = /** @class */ (function (_super) {
    __extends(Body, _super);
    function Body(params) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g;
        if (isNill(params === null || params === void 0 ? void 0 : params.type)) {
            throw new Error('Body required params missed!');
        }
        _this = _super.call(this, {
            type: params.type,
            visible: params === null || params === void 0 ? void 0 : params.visible,
            zIndex: params === null || params === void 0 ? void 0 : params.zIndex,
        }) || this;
        _this.static = (_a = params.static) !== null && _a !== void 0 ? _a : false;
        _this.position = (_b = params.position) !== null && _b !== void 0 ? _b : new V(0, 0);
        _this.origin = (_c = params === null || params === void 0 ? void 0 : params.origin) !== null && _c !== void 0 ? _c : _this.position;
        _this.scale = 1;
        _this.forces = (_d = params.forces) !== null && _d !== void 0 ? _d : new V(0, 0);
        _this.acceleration = new V(0, 0);
        _this.velocity = new V(0, 0);
        _this.angularVelocity = 0;
        _this.angularAcceleration = 0;
        _this.angle = 0;
        _this.mass = (_e = params.mass) !== null && _e !== void 0 ? _e : 1;
        _this.gravity = (_f = params.gravity) !== null && _f !== void 0 ? _f : null;
        _this.friction = (_g = params.friction) !== null && _g !== void 0 ? _g : 0;
        return _this;
    }
    Body.prototype.render = function (drawer) {
        this.draw(drawer);
    };
    ;
    Body.prototype.draw = function (render) { };
    Body.prototype.setUpdateFn = function (fn) {
        this.updateFn = fn;
        return this;
    };
    Body.prototype.update = function (dt, options) {
        var _a, _b;
        if (this.updateFn) {
            return this.updateFn(this, dt);
        }
        if (this.static)
            return;
        var G = (_b = (_a = this.gravity) !== null && _a !== void 0 ? _a : options.globalGravity) !== null && _b !== void 0 ? _b : new Vector(0, 0);
        var d = dt * 0.01;
        var prevPosition = this.position.clone();
        // console.log(new V(0, 1).toAngle(this.angle))
        // this.forces.add(new V(0, 1)) // apply gravity
        // console.log(this.forces.clone().divisionScalar(this.mass))
        var F = this.forces.add(G);
        this.acceleration.add(F.divScalar(this.mass));
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity.clone().mulScalar(d));
        this.angularVelocity = this.angularVelocity * d;
        this.angle = this.angle + this.angularVelocity;
        // calc speed
        // this.speed = this.position.clone().sub(prevPosition).divisionScalar(d);
        // console.log(this.speed.magnitude())
        this.acceleration.mulScalar(0);
        // this.velocity.multiplyScalar(0)
    };
    ;
    Body.prototype.collision = function (obj) {
        if (this.static)
            return;
        // const objPoints = obj.getTransformedVertices();
        // const n = V.getNormal(objPoints.topRight, objPoints.topLeft);
        // // console.log(360 / (2 * Math.PI) * n.angle())
        // var d = obj.position.y - obj.height / 2
        // if (this.position.y + this.radius >= d) {
        // 	this.velocity.y *= -1;
        // 	this.forces.add(n);
        // 	this.position.y = d - this.radius
        // }
        // this.forces.add(new V(-110, -110));
    };
    return Body;
}(Piece));
export { Body };
//# sourceMappingURL=body.js.map