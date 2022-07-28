export default class Vector2 {
    x: number = 0
    y: number = 0

    constructor(x?: number, y?: number) {
        if (typeof x === "number") {
            this.x = x
        }
        if (typeof y === "number") {
            this.y = y
        }
    }
}
