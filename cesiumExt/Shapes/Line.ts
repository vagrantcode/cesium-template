import Shape from "./Base/Shape";
import {
    Cartesian3,
    Color,
    PolylineDashMaterialProperty,
    Viewer
} from "cesium";
import Vector3 from "../Vector/Vector3";
import EntityShape from "./Base/EntityShape";

export default class Line extends EntityShape {
    type: string = 'Line';

    setPosition(): void {
        throw new Error("Method not implemented.");
    }

    setLabel(): void {
        throw new Error("Method not implemented.");
    }

    setColor(color: string): void {
        this.entityConfig.polyline.material = Color.fromCssColorString(color)
        this.entityConfig.polyline.depthFailMaterial = new PolylineDashMaterialProperty({
            color: Color.fromCssColorString(color)
        })
        this.refresh()
    }

    entityConfig: any = {
        polyline: {
            positions: [],
            width: 5,
            material: Color.RED,
            depthFailMaterial: new PolylineDashMaterialProperty({
                color: Color.RED
            })
        }
    }

    constructor(viewer: Viewer, positions: Array<Vector3>) {
        super(viewer);
        this.viewer = viewer
        let posArray: number[] = []
        if (positions.length) {
            positions.forEach((item: Vector3) => {
                posArray.push(item.x)
                posArray.push(item.y)
                posArray.push(item.z)
            })
        }
        this.entityConfig.polyline.positions = Cartesian3.fromDegreesArrayHeights(posArray)
        this.entityConfig.objId = this.id
        this.draw(viewer)
    }

}
