import {Activity} from "../Activity";
import {
    Viewer
} from "cesium";
import Vector3 from "../Vector/Vector3";
import Point from "../Shapes/Point";
import Line from "../Shapes/Line";
import Plane from "../Shapes/Plane";

export default class DrawExample extends Activity {
    isDrawPointLine: boolean = false
    // @ts-ignore
    viewer: Viewer = null
    drawPointLonLats: Array<any> = []

    onCreate(viewer: Viewer): void {
        this.viewer = viewer
        new Plane(this.viewer,[]);
        new Line(viewer, [new Vector3(107.57553409, 42.398, -110.7), new Vector3(107.57553409, 42.397, -100.7),new Vector3(107.57553409, 42.396, -100.7)])
        new Point(viewer, new Vector3(107.57553409, 42.398, 0))
    }
}
