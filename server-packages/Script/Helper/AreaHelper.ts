import Vector3 = RageMP.Vector3;

export class AreaHelper {
    static isPointInside(point: Point, vs: Point[]): boolean {
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

        const {x, y} = point;

        let inside = false;
        // tslint:disable-next-line:one-variable-per-declaration
        for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            let xi = vs[i][0];
            let yi = vs[i][1];
            let xj = vs[j][0];
            let yj = vs[j][1];

            const intersect = ((yi > y) !== (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    }

    static getRandomPointInDistance(point: Point, radius: number): Point {
        const angle = Math.random() * Math.PI * 2;
        return new Point(
            point.x + Math.cos(angle) * Math.random() * radius,
            point.y + Math.sin(angle) * Math.random() * radius
        );
    }
}

export class Point {
    public x: number;
    public y: number;

    static fromVector(vector: Vector3): Point {
        return new Point(vector.x, vector.y);
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
