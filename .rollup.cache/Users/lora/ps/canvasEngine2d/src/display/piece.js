import { randomColor } from '#/utils';
import { isNill } from '#/utils';
var Piece = /** @class */ (function () {
    function Piece(params) {
        var _a, _b;
        if (isNill(params.type)) {
            throw new Error('Piece required params missed!');
        }
        this.id = randomColor();
        this.type = params.type;
        this.visible = (_a = params === null || params === void 0 ? void 0 : params.visible) !== null && _a !== void 0 ? _a : true;
        this.zIndex = (_b = params === null || params === void 0 ? void 0 : params.zIndex) !== null && _b !== void 0 ? _b : undefined;
    }
    Piece.prototype.draw = function (render) { };
    Piece.prototype.update = function (dt, options) { };
    ;
    Piece.prototype.collision = function (obj) { };
    return Piece;
}());
export { Piece };
//# sourceMappingURL=piece.js.map