import Moment from "moment";
import {StringHelper} from "./StringHelper";

export class TimeHelper {

    /**
     * years    y
     * quarters    Q
     * months    M
     * weeks    w
     * days    d
     * hours    h
     * minutes    m
     * seconds    s
     * @param txt
     */
    static getTimeFromTimestring(txt: string): number {
        const regexp = /(?<time>[0-9]+)(?<unit>[yQMwdhms])/;
        const extendedRegExp = /^((?<time>[0-9]+)(?<unit>[yQMwdhms]))+$/;

        if (!extendedRegExp.test(txt)) {
            throw new Error(`'${txt}' is not a timestring`);
        }

        const moment = Moment(0);

        const matches = StringHelper.matchAll(txt, regexp);
        for (const m of matches) {
            if (!m.groups || !m.groups.time || !m.groups.unit) { continue; }
            // @ts-ignore
            moment.add(parseInt(m.groups.time, 10), m.groups.unit);
        }

        return moment.diff(0);
    }

}
