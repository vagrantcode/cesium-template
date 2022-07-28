import {Cartesian2, Cartesian3, Color, Entity, HorizontalOrigin, LabelStyle, VerticalOrigin, Viewer} from "cesium";
import Vector3 from "../Vector/Vector3";
import MarkerStyle from "../Style/MarkerStyle";
import EntityShape from "./Base/EntityShape";

export default class Point extends EntityShape {
    entityConfig: any={
        position: Cartesian3.fromDegrees(0, 0, 0),
        path:{

        },
        point: {
            color: Color.RED,    //点位颜色
            pixelSize: 0                //像素点大小
        },
        label: {
            text: '测试点',
            font: '14pt Source Han Sans CN',    //字体样式
            fillColor: Color.BLACK,        //字体颜色
            backgroundColor: Color.AQUA,    //背景颜色
            showBackground: true,                //是否显示背景颜色
            style: LabelStyle.FILL,        //label样式
            outlineWidth: 2,
            verticalOrigin: VerticalOrigin.CENTER,//垂直位置
            horizontalOrigin: HorizontalOrigin.LEFT,//水平位置
            pixelOffset: new Cartesian2(10, 0)            //偏移
        },
        billboard: {
            //图标
            image: '',
            width: 20,
            height: 20,
            scale: 1,
            pixelOffset: new Cartesian2(0, 0),
        }
    };

    constructor(viewer: Viewer, pos: Vector3, option?: object) {
        super(viewer);
        if (option) {
            this.entityConfig = option
        }
        this.entityConfig.position = Cartesian3.fromDegrees(pos.x, pos.y, pos.z)
        this.refresh()
    }

    setColor(color:string): void {
        this.entityConfig.point.color=Color.fromCssColorString(color)
        this.refresh()
    }

    setLabel(text:string): void {
        this.entityConfig.label.text=text
        this.refresh()
    }

    setPosition(position:Vector3): void {
        this.entityConfig.position=Cartesian3.fromDegrees(position.x,position.y,position.z)
        this.refresh()
    }

    setMarker(markerStyle:MarkerStyle){
        this.entityConfig.billboard=Object.assign(this.entityConfig.billboard,markerStyle)
        this.refresh()
    }

    type: string='Point';
}
