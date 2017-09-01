import Canvas from './App/Canvas'
import App from './App/App'

window.onload = () => {
    let app = new App(
        new Canvas(document.getElementById('main')),
        new Canvas(document.getElementById('controller'))
    )

    app.run()
}
