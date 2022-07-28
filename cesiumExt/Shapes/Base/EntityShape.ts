import Shape from "./Shape";
import {Entity, Viewer} from "cesium";

abstract class EntityShape extends Shape {
    protected constructor(viewer: Viewer) {
        super();
        this.viewer = viewer
    }

    abstract entityConfig: any
    /**
     * 当前实体
     * */
    entity!: Entity;
    /**
     * cesium的图层载体
     * */
    viewer: Viewer

    /**
     * 绘制元素到图层
     * */
    draw(viewer?: Viewer): void {
        if (viewer) {
            this.entity = viewer.entities.add(this.entityConfig)
        }
    }

    /**
     * 移除此元素
     * */
    remove(): void {
        this.entity && this.viewer.entities.remove(this.entity)
    }

    /**
     * 重新绘制这个实体对象
     * */
    refresh(): void {
        this.remove()
        this.draw(this.viewer)
    }

    /**
     * 视角移动到此元素
     * */
    focus(): void {
        if (this.viewer && this.entity) {
            this.viewer.zoomTo(this.entity).then(() => {
            })
        }

    }

    /**
     * 点击事件触发
     * */
    _click(id: string) {
        if (this.entity && this.entity.id === id) {
            this.clickCallBack && this.clickCallBack(this.id)
        }
    }
}

export default EntityShape
