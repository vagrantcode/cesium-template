import {defined, ScreenSpaceEventHandler, ScreenSpaceEventType, Viewer} from "cesium";
import {Activity} from "../Activity";

export interface IClick {
    _click(id: string): void
    onClick(callBack:Function):void
}

class ClickEvent extends Activity {
    static modules: Array<any> = []

    static use(module: IClick) {
        ClickEvent.modules.push(module)
    }

    onCreate(viewer: Viewer) {
        let handler = new ScreenSpaceEventHandler(viewer.scene.canvas);

        handler.setInputAction(function (movement: any) {
            let pick = viewer.scene.pick(movement.position);
            if (defined(pick) && pick.id && pick.id.id) {
                for (let i in ClickEvent.modules) {
                    new Promise(resolve => {
                        ClickEvent.modules[i]._click(pick.id.id)
                        resolve(null)
                    }).then()
                }
            }

        }, ScreenSpaceEventType.LEFT_CLICK);
    }
}
new ClickEvent()
export default ClickEvent
