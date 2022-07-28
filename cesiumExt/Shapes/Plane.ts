import {Cartesian3, Viewer, Color, DistanceDisplayCondition, Entity, ClassificationType} from "cesium";
import Vector3 from "../Vector/Vector3";
import EntityShape from "./Base/EntityShape";

export default class Plane extends EntityShape {
    entityConfig: any={
        polygon: {
            // 获取指定属性（positions，holes（图形内需要挖空的区域））
            hierarchy: {
                positions: Cartesian3.fromDegreesArrayHeights([
                    120.9677706, 30.7985748,
                    110.20, 34.55,
                    120.20, 50.55
                ]),
                holes: []
            },
            // 边框
            outline: true,
            // 边框颜色
            outlineColor: Color.WHITE,
            // 边框尺寸
            outlineWidth: 2,
            // 填充的颜色，withAlpha透明度
            material: Color.GREEN.withAlpha(0.5),
            depthTestAgainstTerrain:true,
            // 是否被提供的材质填充
            fill: true,
            // 高度
            perPositionHeight: true,
            // 显示在距相机的距离处的属性，多少区间内是可以显示的
            distanceDisplayCondition: new DistanceDisplayCondition(1000, 10000000),
            // 是否显示
            show: true,
            // 顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
            zIndex: 10
        }
    };
    setPosition(position:Array<Vector3>): void {
        let pos: number[]=[]
        position.forEach(item=>{
            pos.push(item.x)
            pos.push(item.y)
            pos.push(item.z)
        })
        this.entityConfig.polygon.hierarchy.positions=Cartesian3.fromDegreesArrayHeights(pos)
        this.refresh()
    }
    setLabel(): void {
        throw new Error("Method not implemented.");
    }
    setColor(color:string): void {
       this.entityConfig.polygon.material=Color.fromCssColorString(color)
        this.refresh()
    }
    constructor(viewer: Viewer,positions:Array<Vector3>) {
        super(viewer);
        this.viewer = viewer
        this.setPosition(positions)
    }
    type: string='Plane';
}
