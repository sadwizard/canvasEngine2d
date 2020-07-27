import _ from 'lodash';
import Vector from '../vector';
import Body from '../body';
import { SHAPE_TYPES } from '../constants';

export default class Shape extends Body {
    constructor(params) {
        super(params);
    }

    stroke(ctx) {
        if (this.strokeWith) {
            ctx.stroke();
        }
    }

    getEdges(isArray) { // Clockwise
      const obj = this;
      if (obj.type !== SHAPE_TYPES.RECTANGLE) {
        throw new Error('type object should be rectanlge');
      }

      if (isArray) {
        return [
          obj.position.y - obj.height / 2,
          obj.position.x + obj.width / 2,
          obj.position.y + obj.height / 2,
          obj.position.x - obj.width / 2,
        ];
      }

      return {
        left: obj.position.x - obj.width / 2,
        top: obj.position.y - obj.height / 2,
        right: obj.position.x + obj.width / 2,
        bottom: obj.position.y + obj.height / 2,
      };
    }

    getTransformedVertices(isArray) {
      const obj = this;
      if (obj.type !== SHAPE_TYPES.RECTANGLE) {
        throw new Error('type object should be rectanlge');
      }

      const c = obj.getEdges(true);

      if (isArray) {
        return [
          new Vector(c.left, c.top).rotateToPoint(obj.position, obj.angle),
          new Vector(c.right, c.top).rotateToPoint(obj.position, obj.angle),
          new Vector(c.right, c.bottom).rotateToPoint(obj.position, obj.angle),
          new Vector(c.left, c.bottom).rotateToPoint(obj.position, obj.angle),
        ];
      }

      return {
        topLeft: new Vector(c.left, c.top).rotateToPoint(obj.position, obj.angle),
        topRight: new Vector(c.right, c.top).rotateToPoint(obj.position, obj.angle),
        bottomRight: new Vector(c.right, c.bottom).rotateToPoint(obj.position, obj.angle),
        bottomLeft: new Vector(c.left, c.bottom).rotateToPoint(obj.position, obj.angle),
      };
    }

    getNormals() {
      const vertices = this.getTransformedVertices(true);
      let norms = [], p1, p2, n;

      for(let i = 1; i < vertices.length; i++) {
        let p1 = vertices[i - 1],
            p2 = vertices[i];

        n = new Vector(p2.x - p1.x, p2.y - p1.y).normalR();
        norms.push(n);
      }

      return norms;
    }
}
