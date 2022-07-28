import {Viewer} from "cesium";
import CesiumExt from "./CesiumExt";
import {guid} from "mw-libs";

export interface IActivity {
    id:string;
    onCreate(viewer: Viewer): void;
}
export abstract class Activity implements IActivity{
    id:string=guid()
    constructor() {
        CesiumExt.use(this)
    }
    abstract onCreate(viewer: Viewer): void;
}
