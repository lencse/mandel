import Canvas from './Canvas';
import { Point } from './lib';

export default class Controller {

    private canvas: Canvas;
    private from: Point = null;
    private resizeHandler: (center: Point, width: number) => void;
    
    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.canvas.onMouseDown((e: MouseEvent) => {
            this.from = {x: e.clientX, y: e.clientY};
        });
        this.canvas.onMouseMove((e: MouseEvent) => {
            if (!this.from) {
                return;
            }
            this.canvas.clear();
            this.canvas.fillRect(
                'rgba(255, 255, 255, 0.3)',
                this.from.x,
                this.from.y,
                e.clientX - this.from.x,
                Math.round((e.clientY > this.from.y ? 1 : -1) * this.canvas.height * Math.abs(e.clientX - this.from.x) / this.canvas.width)
            );
        });
        this.canvas.onMouseUp((e: MouseEvent) => {
            this.canvas.clear();
            this.resizeHandler(
                {
                    x: Math.round((e.clientX + this.from.x) / 2),
                    y: Math.round((e.clientY + this.from.y) / 2)
                },
                Math.abs(e.clientX - this.from.x)
            )
            this.from = null;
        });
    }

    public onResize(handler: (center: Point, width: number) => void) {
        this.resizeHandler = handler;
    }
        
}
