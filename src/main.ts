import Canvas from './Canvas';
import App from './App';

let app = new App(
    new Canvas(document.getElementById('main')),
    new Canvas(document.getElementById('controller'))
);

app.run();
