import {createWorldTerrain} from "cesium";
import {Cesium3DTileset} from "cesium";
import {Viewer} from "cesium";
import {IActivity} from "./Activity";



export default class CesiumExt {
    static activities: Array<IActivity> = []

    static use(activity: IActivity) {
        CesiumExt.activities.push(activity)
    }
    private initConfig:any={
        geocoder: false, //是否显示地名查找控件
        homeButton: false,
        sceneModePicker: false, //是否显示投影方式控件
        selectionIndicator: false,
        baseLayerPicker: false, //是否显示图层选择控件
        navigationHelpButton: false, //是否显示帮助信息控件
        animation: false, // 是否显示动画控件
        // creditContainer: "credit",
        timeline: false, //是否显示时间线控件
        fullscreenButton: false,
        vrButton: false,
        infoBox: false, //是否显示点击要素之后显示的信息
        requestRenderMode: false, //启用请求渲染模式
        scene3DOnly: true, //每个几何实例将只能以3D渲染以节省GPU内存
        sceneMode: 3, //初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
        terrainProvider: createWorldTerrain({
            requestWaterMask: true,
            requestVertexNormals: true
        }),
    }

    viewer: Viewer

    constructor(id: string, url: string) {
        this.viewer = new Viewer(id, this.initConfig)
        this.viewer.scene.globe.show = false
        let tilesModel = new Cesium3DTileset({
            url: url,
            maximumScreenSpaceError: 90
        });
        let loader = this.viewer.scene.primitives.add(tilesModel);
        loader.readyPromise.then(() => {
            this.viewer.zoomTo(tilesModel).then(() => {
            })
        })
        // @ts-ignore
        this.viewer.cesiumWidget.creditContainer.style.display = "none";
        CesiumExt.activities.map((activity: IActivity) => {
            activity.onCreate(this.viewer)
        })
    }
}
