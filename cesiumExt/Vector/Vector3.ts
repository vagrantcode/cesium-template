export default class Vector3{
    x:number=0
    y:number=0
    z:number=0
    constructor(x?:number,y?:number,z?:number) {
        if (typeof x === "number") {
            this.x = x
        }
        if (typeof y === "number") {
            this.y = y
        }
        if (typeof z === "number") {
            this.z = z
        }
    }
}
