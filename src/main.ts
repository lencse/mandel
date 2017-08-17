import Canvas from './Canvas';
import Fractal from './Fractal';

let fractal = new Fractal(new Canvas(document.getElementById('main')));
fractal.draw();