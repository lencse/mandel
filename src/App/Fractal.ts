import Canvas from './Canvas'
import { maxIterations, Complex, Point } from './lib'
import colors from './colors'

export default class Fractal {

    private center: Complex = {
        re: -0.4,
        im: 0.0
    }

    private width: number = 4.0

    private canvas: Canvas

    constructor(canvas: Canvas) {
        this.canvas = canvas
    }

    public resize(center: Point, width: number) {
        const newCenter: Complex = {
            re: this.center.re + (center.x - this.canvas.width/2) * this.width / this.canvas.width,
            im: this.center.im + (center.y - this.canvas.height/2) * this.width /this.canvas.width
        }
        const newWidth = this.width * width / this.canvas.width
        this.setState(newCenter, newWidth)
    }

    public setState(center: Complex, width: number) {
        this.center = center
        this.width = width
        this.draw()
    }

    public draw() {
        this.canvas.clear()
        const width = this.canvas.width
        const height = this.canvas.height
        for (let col = 0; col < width; ++col) {
            for (let row = 0; row < height; ++row) {
                const c: Complex = {
                    re: this.center.re + (col - width/2) * this.width / width,
                    im: this.center.im + (row - height/2) * this.width / width
                }
                let z: Complex = c
                let iteration = 0
                while (iteration < maxIterations && z.re*z.re + z.im*z.im <= 4.0) {
                    z = {
                        re: z.re*z.re - z.im*z.im + c.re,
                        im: 2*z.re*z.im + c.im
                    }
                    ++iteration
                }

                this.canvas.fillRect(iteration < maxIterations ? colors[iteration] : 'rgb(0, 0, 0)', col, row, 1, 1)
            }
        }
    }

}
