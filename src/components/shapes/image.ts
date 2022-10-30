import Render from '../render';
import Vector from '../vector';
import { Body, TBodyRequiredParams } from '../body';
import { SHAPE_TYPES } from '../constants';

type TImageParams = TBodyRequiredParams & Pick<
    Image,
    'width' |
    'height' |
	'imageSource' |
	'src'
> & { positions?: Vector };

export class Image extends Body {
    width: number;
	height: number;
    imageSource?: HTMLImageElement;
    src: string;

    constructor(params: Partial<TImageParams>) {
        super({
            type: SHAPE_TYPES.IMAGE,
            position: params.position,
        });

        this.width = params.width ?? 10;
        this.height = params.height ?? 10;
        this.src = params.src;
        
        if (typeof params.src !== 'string') {
            throw Error('Image should contain src param');
        }
    
        if (this.imageSource === undefined) {
            this.loadImage(this.src).then((img: HTMLImageElement) => {
                this.imageSource = img;
            });
        }
    }

    draw(drawer: Render['draw']) {
        const { position, width, height } = this;
        drawer(this.position.x, this.position.y, 0, (ctx) => {
          ctx.drawImage(this.imageSource, position.x - width / 2, position.y - height / 2, width, height);
        });
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            if (src === undefined) {
                const errMessage = `Image should have src (${this.id})`;
                console.error(errMessage);
                reject(errMessage);
            }
    
            const img: HTMLImageElement = window.document.createElement('img');
    
            img.onerror = (err) => {
                console.error(err);
                reject(err);
            }

            img.onload = () => {
                resolve(img);
            }

            img.src = src;
        })
    }
}
