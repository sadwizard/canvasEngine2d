import _ from 'lodash';
import Body from './body';
import Ticker from './ticker';
import Render from './render';

export default function Core(node, width, height, backgroundColor) {
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
    this.ticker = new Ticker(this.ctx, { w: width, h: height });
    this.renderer = new Render(this.ctx);
}


Core.prototype.addBody = function (...args) {
    _.map(args, (item) => {
        if (item instanceof Body) {
            this.objects.push(item);
        }
    });
};


Core.prototype.removeBody = () => {

};


Core.prototype.run = function() {
    const drawer = this.renderer.draw.bind(this);
    this.ticker.setUpdateFunc(() => {
        _.map(this.objects, (item) => {
            item.render(drawer);
            item.update();
        });  
    });
    this.ticker.start();
};

Core.prototype.stop = () => {
  
};
