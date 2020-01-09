import _ from 'lodash';
import Body from './body';
import Ticker from './ticker';
import Render from './render';

export default class Core {
    constructor(node, width, height, backgroundColor) {
        const FPS = 1000 / 30;

        this.canvas = node;
        this.ctx = node.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.backgroundColor = backgroundColor;
        this.vars = {
            w: width,
            h: height,
            wh: width / 2,
            hh: height / 2,
        };

        this.ctx.globalAlpha = 1;
        this.objects = [];
        this.ticker = new Ticker(this.ctx, { w: width, h: height }, FPS);
        this.renderer = new Render(this.ctx);
    }

    addBody(...args) {
        _.map(args, (item) => {
            if (item instanceof Body) {
                this.objects.push(item);
            }
        });
    }

    removeBody(id) {
        const index = _.findIndex(this.objects, item => item.id === id);
        delete this.objects[index];
    }

    run() {
        const drawer = this.renderer.draw.bind(this);
        this.ticker.setUpdateFunc((time) => {
            console.log(time)
            _.map(this.objects, (item) => {
                item.render(drawer);
                item.update();
            });
        });
        this.ticker.start();
    }

    stop() {
        this.ticker.stop();
    }
}