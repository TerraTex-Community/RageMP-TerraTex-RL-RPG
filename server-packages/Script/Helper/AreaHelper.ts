import Vector3 = RageMP.Vector3;
import {polygonContains} from "d3-polygon";

export class AreaHelper {

    static isPointInside(point: Point, area: Point[]): boolean {
        return polygonContains(Point.pointListToArrayList(area), point.toArray());
    }

    static getRandomPointInDistance(point: Point, radius: number, minDistance: number = 0): Point {
        const angle = Math.random() * Math.PI * 2;

        const factor = Math.random() * (radius - minDistance) + minDistance;

        return new Point(
            point.x + Math.cos(angle) * factor,
            point.y + Math.sin(angle) * factor
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

    toArray(): [number, number] {
        return [this.x, this.y];
    }

    static pointListToArrayList(points: Point[]): [number, number][] {
        const result: [number, number][] = [];
        for (const point of points) {
            result.push(point.toArray());
        }
        return result;
    }
}
