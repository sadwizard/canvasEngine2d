import { __extends } from "tslib";
import Vector from '#/core/vector';
import { isNill } from '#/utils';
import { Piece } from './piece';
var V = Vector;
var Body = /** @class */ (function (_super) {
    __extends(Body, _super);
    function Body(params) {
        var _this = this;
        var _a, _b;
        if (isNill(params.type) || isNill(params.visible)) {
            throw new Error('Body required params missed!');
        }
        _this = _super.call(this, { type: params.type, visible: params.visible }) || this;
        _this.static = (_a = params.static) !== null && _a !== void 0 ? _a : false;
        _this.position = (_b = params.position) !== null && _b !== void 0 ? _b : new V(0, 0);
        _this.scale = 1;
        _this.forces = new V(0, 1);
        _this.acceleration = new V(0, 0);
        _this.velocity = new V(0, 0);
        _this.angularVelocity = 0;
        _this.angularAcceleration = 0;
        _this.angle = 0;
        _this.mass = 1;
        return _this;
    }
    Body.prototype.render = function (drawer) {
        this.draw(drawer);
    };
    ;
    Body.prototype.draw = function (render) { };
    Body.prototype.updateFn = function (body) { };
    Body.prototype.update = function (dt) {
        if (this.updateFn) {
            return this.updateFn(this);
        }
        if (this.static)
            return;
        var d = dt * 0.01;
        var prevPosition = this.position.clone();
        // console.log(new V(0, 1).toAngle(this.angle))
        // this.forces.add(new V(0, 1)) // apply gravity
        // console.log(this.forces.clone().divisionScalar(this.mass))
        this.acceleration.add(this.forces.divScalar(this.mass));
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