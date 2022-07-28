import React from "react";
import {Viewer} from "cesium";
import CesiumExt from "../cesiumExt/CesiumExt";
import DrawExample from "../cesiumExt/Activites/DrawExample";

export default class CesiumApp extends React.Component {
    render() {
        return (<div id="cesiumContainer" className="fullSize"></div>)
    }

    componentDidMount() {

        setTimeout(() => {
            new DrawExample()
            let viewer = new CesiumExt('cesiumContainer','')
        })
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        alert(1)
    }
}
