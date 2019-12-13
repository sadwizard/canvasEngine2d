import _ from 'lodash';
import Vector from './vector';
import { randomColor } from './utils';

export default function Body(params) {
    const id = randomColor();
    const defaults = {
        id,
        isStatic: false,
        position: new Vector(0, 0),
        scale: 1,
        shape: 'rectangle',
        width: 10,
        height: 10,
        speed: new Vector(0, 0),
        forces: new Vector(0, 0),
        angle: 0,
        mass: 1,
        fillStyle: id,
        strokeStyle: 0,
        strokeWidth: 0,
        radius: 10,
    };

    const extendedOpts = _.extend(defaults, params);

    _.map(Object.keys(extendedOpts), (key) => {
        this[key] = extendedOpts[key];
    });

    if (this.shape === 'image' && !this.imageSource) {
        this.loadImage(this.src).then((img) => this.imageSource = img);
    }

}

Body.prototype.render = function(drawer) {
    switch(this.shape) {
        case 'rectangle':
            this.drawRect(drawer);
        case 'circle':
            this.drawCircle(drawer);
        case 'path':
            this.drawPath(drawer);
        case 'image':
            this.drawPath(drawer);
    }
};

Body.prototype.update = function() {

};

Body.prototype.drawRect = function(drawer) {
    const { position, width, height, angle, radius, fillStyle, strokeStyle, strokeWith } = this;

    drawer(position.x, position.y, angle, (ctx) => {
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.strokeWith = strokeWith;
        ctx.rect(position.x - width / 2, position.y - height / 2, width, height);
        ctx.fill();
        ctx.stroke();
    });
};

Body.prototype.drawCircle = function(drawer) {
    const { position, angle, radius, fillStyle, strokeStyle, strokeWith } = this;

    drawer(position.x, position.y, angle, (ctx) => {
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.strokeWith = strokeWith;
        ctx.beginPath();
        ctx.arc(position.x, position.y, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    });
};

Body.prototype.drawPath = function(drawer) {

};

Body.prototype.drawImage = function(drawer) {
    const { position, width, height } = this;
    drawer(this.position.x, this.position.y, 0, (ctx) => {
      ctx.drawImage(this.imageSource, position.x - width / 2, position.y - height / 2, width, height);
    });
};

Body.prototype.loadImage = function(src) {
    new Promise((resolve, reject) => {
        if (!src) {
            const errMessage = `Body type image should have src (${this.id})`;
            console.error(errMessage);
            reject(errMessage);
        }

        const img = new Image();

        img.onerror = (err) => {
            console.error(err);
            reject(err);
        }
        img.onload = () => {
            resolve(img);
        }
        img.src = src;
    })
};