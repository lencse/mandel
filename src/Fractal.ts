import Canvas from './Canvas';
import { maxIterations } from './consts';
import colors from './colors';

export default class Fractal {

    private canvas: Canvas;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
    }

    public draw() {
        this.canvas.clear();
        const width = this.canvas.width;
        const height = this.canvas.height;
        for (let col = 0; col < width; ++col) {
            for (let row = 0; row < height; ++row) {
                let cRe = (col - width/2.0) * 4.0 / width;
                let cIm = (row - height/2.0) * 4.0 / width;
                let x = 0.0;
                let y = 0.0;
                let iteration = 0;
                while (iteration < maxIterations && x*x + y*y <= 4.0) {
                    let xNew = x*x - y*y + cRe;
                    y = 2*x*y + cIm;
                    x = xNew;
                    ++iteration;
                }

                this.canvas.fillRect(iteration < maxIterations ? colors[iteration] : 'rgb(0, 0, 0)', col, row, 1, 1);
            }            
        }
    }

}
