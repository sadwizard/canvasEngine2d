import { randomColor } from '#/utils';
var Piece = /** @class */ (function () {
    function Piece(params) {
        var _a;
        this.id = randomColor();
        this.type = params.type;
        this.visible = (_a = params.visible) !== null && _a !== void 0 ? _a : true;
    }
    Piece.prototype.draw = function (render) { };
    Piece.prototype.update = function (dt) { };
    ;
    Piece.prototype.collision = function (obj) { };
    return Piece;
}());
export { Piece };
//# sourceMappingURL=piece.js.map