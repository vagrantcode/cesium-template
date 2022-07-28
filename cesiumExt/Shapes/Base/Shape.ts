import {createGuid, Viewer} from "cesium";
import ClickEvent, {IClick} from "../../Event/Click";

export interface IDraw {
    draw(viewer?: Viewer): void
}

abstract class Shape implements IDraw, IClick {
    protected constructor() {
        ClickEvent.use(this)
    }
    clickCallBack:Function|undefined

    abstract type: string
    id: string = createGuid()

    abstract draw(viewer?: Viewer): void;

    abstract remove(): void

    abstract refresh(): void

    abstract setPosition(position: any): void

    abstract setLabel(text: string): void

    abstract setColor(color: string): void

    abstract focus(): void

    abstract _click(id: string): void;

    onClick(callBack: Function): void {
        this.clickCallBack=callBack
    }


}

export default Shape
