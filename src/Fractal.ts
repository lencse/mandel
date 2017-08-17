import Canvas from './Canvas';

export default class Fractal {

    private canvas: Canvas;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
    }

    public draw() {
        this.canvas.clear();
        const max = 1024;
        const width = this.canvas.width;
        const height = this.canvas.height;
        for (let col = 0; col < width; ++col) {
            for (let row = 0; row < height; ++row) {
                let cRe = (col - width/2.0) * 4.0 / width;
                let cIm = (row - height/2.0) * 4.0 / width;
                let x = 0.0;
                let y = 0.0;
                let iteration = 0;
                while (iteration < max && x*x + y*y <= 4.0) {
                    let xNew = x*x - y*y + cRe;
                    y = 2*x*y + cIm;
                    x = xNew;
                    ++iteration;
                }

                this.canvas.fillRect(iteration < max ? '#0cc' : '#000', col, row, 1, 1);
            }            
        }
    }

}
