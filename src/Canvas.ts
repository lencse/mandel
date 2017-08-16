export default class Canvas {

    private canvas;

    constructor(container: HTMLElement) {
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', container.clientWidth);
        this.canvas.setAttribute('height', container.clientHeight);
        this.canvas.setAttribute('id', 'canvas');
        container.appendChild(this.canvas);
    }

    public get width(): number {
        return this.canvas.clientWidth;
    }

    public get height(): number {
        return this.canvas.clientHeight;
    }

    public get context(): CanvasRenderingContext2D {
        return this.canvas.getContext('2d');
    }

    public draw() {
        let context = this.context;
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.strokeStyle = '#df4b26';
        this.context.lineJoin = 'round';
        this.context.lineWidth = 4;
                  
        this.context.beginPath(); 
        this.context.moveTo(0, 0);
        this.context.lineTo(this.width, this.height);
        this.context.closePath();
        this.context.stroke();       
    }

}