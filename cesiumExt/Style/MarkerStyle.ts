import Vector2 from "../Vector/Vector2";

export default class MarkerStyle {
    image: any = ''
    width: number = 20
    height: number = 20
    scale: number = 1
    pixelOffset: Vector2 = new Vector2(0, 0)

    constructor(image: any, width?: number, height?: number,scale?: number, pixelOffset?: Vector2 ) {
        this.image = image
        typeof width === "number" ? this.width = width : ''
        typeof height === "number" ? this.height = height : ''
        pixelOffset instanceof Vector2 ? this.pixelOffset = pixelOffset : ''
        typeof scale === "number" ? this.scale = scale : ''
    }
}
