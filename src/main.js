import React from "react";
import * as ReactDOM from "react-dom/client";
import App from './App'
import './assets/app.css'
document.addEventListener('DOMContentLoaded', () => {
    let rootDiv = document.createElement('div')
    rootDiv.id = 'vimi-app'
    document.getElementsByTagName('body')[0].appendChild(rootDiv)
    let root = ReactDOM.createRoot(document.getElementById('vimi-app'))
    root.render(<App name={"react"}/>)
})
