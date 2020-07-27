import _ from 'lodash';
import Body from './body';
import Ticker from './ticker';
import Render from './render';
import Collision from './collision';

export default class Game2d {
    constructor(node, width, height, backgroundColor) {
        const FPS = 1000 / 40;

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
        this.tickerUpdate = new Ticker(this.ctx, { FPS, tieRender: true });
        this.tickerRender = new Ticker(this.ctx, { tieRender: false })
        this.renderer = new Render(this.ctx);
        this.collisions = new Collision();

        return this;
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
        this.tickerRender.setUpdateFunc(() => {
          this.ctx.clearRect(0, 0, this.vars.w, this.vars.h);
          _.map(this.objects, (item) => {
            item.render(drawer);
          });
        });

        this.tickerUpdate.setUpdateFunc((dt) => {
          this.collisions.update(this.objects);
          _.map(this.objects, (item) => {
            item.update(dt);
          });
        })

        this.tickerRender.start();
        this.tickerUpdate.start();
    }

    stop() {
      this.tickerRender.stop();
      this.tickerUpdate.stop();
    }
}
