import Render from '#/core/render';
import Vector from '#/core/vector';
import { SHAPE_TYPES } from '#/constants';
import { Body, TBodyParams } from '../body';

type TImageParams = TBodyParams & Pick<
    Image,
    'width' |
    'height' |
	'imageSource' |
	'src'
>;

export class Image extends Body {
    width: number;
	height: number;
    imageSource?: HTMLImageElement;
    src: string;

    constructor(params: TImageParams) {
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
            }).catch((err: Error) => {
                console.log(err);
            });
        }
    }

    draw(drawer: Render['draw']) {
        const { position, width, height } = this;

        if (this.imageSource !== undefined) {
            drawer(this.position.x, this.position.y, 0, (ctx) => {
                ctx.drawImage(this.imageSource as CanvasImageSource, position.x - width / 2, position.y - height / 2, width, height);
            });
        }
    }

    loadImage(src: string): Promise<HTMLImageElement> {
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
