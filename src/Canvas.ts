export default class Canvas {

    protected canvas: HTMLCanvasElement;
    protected context: CanvasRenderingContext2D;

    constructor(container: HTMLElement) {
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', container.clientWidth.toString());
        this.canvas.setAttribute('height', container.clientHeight.toString());
        container.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
    }

    public get width(): number {
        return this.canvas.clientWidth;
    }

    public get height(): number {
        return this.canvas.clientHeight;
    }

    public clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    public fillRect(color: string, x: number, y: number, width: number, height: number) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }

    public onMouseDown(listener: EventListener) {
        this.canvas.addEventListener('mousedown', listener);
    }

    public onMouseMove(listener: EventListener) {
        this.canvas.addEventListener('mousemove', listener);
    }

    public onMouseUp(listener: EventListener) {
        this.canvas.addEventListener('mouseup', listener);
    }

}