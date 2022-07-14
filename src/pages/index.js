import React from "react";
import {Viewer} from "cesium";

export default class CesiumApp extends React.Component {
    render() {
        return (<div id="cesiumContainer" className="fullSize"></div>)
    }

    componentDidMount() {

        setTimeout(() => {
            let viewer = new Viewer('cesiumContainer')
        })
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        alert(1)
    }
}
