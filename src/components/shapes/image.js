import _ from 'lodash';
import Vector from '../vector';
import Shape from './shape';

export default function Image(params) {
    Shape.call(this, params);

    const defaults = {
        shape: 'image',
        isStatic: false,
        position: new Vector(0, 0),
        scale: 1,
        shape: 'image',
        speed: new Vector(0, 0),
        forces: new Vector(0, 0),
        angle: 0,
        mass: 1,
        radius: 10,
        src: '',
    };

    const extendedOpts = _.extend(defaults, params);

    _.map(Object.keys(extendedOpts), (key) => {
        this[key] = extendedOpts[key];
    });

    if (!this.imageSource) {
        this.loadImage(this.src).then((img) => this.imageSource = img);
    }
}

Image.prototype.draw = function(drawer) {
    const { position, width, height } = this;
    drawer(this.position.x, this.position.y, 0, (ctx) => {
      ctx.drawImage(this.imageSource, position.x - width / 2, position.y - height / 2, width, height);
    });
};

Image.prototype.loadImage = function(src) {
    new Promise((resolve, reject) => {
        if (!src) {
            const errMessage = `Image should have src (${this.id})`;
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