import Fractal from './Fractal';
import Controller from './Controller';
import Canvas from './Canvas';
import { Point } from './lib';

export default class App {

    private fractal: Fractal;
    private controller: Controller;

    constructor(mainCanvas: Canvas, controlerCanvas: Canvas) {
        this.fractal = new Fractal(mainCanvas);
        this.controller = new Controller(controlerCanvas);
        this.controller.onResize((center: Point, width: number) => {
            this.fractal.resize(center, width);
        });
    }

    public run() {
        this.fractal.draw();
    }

}
