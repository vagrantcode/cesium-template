import React from "react";
import CesiumApp from "./pages";

export default class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (<div id="app">
            <CesiumApp/>
        </div>

        );
    }

}
