import moment from 'moment';

export function cloneObject(object: any) {
    return JSON.parse(JSON.stringify(object));
}

export function shallowCopy(original: any) {
    // First create an empty object
    // that will receive copies of properties
    const clonedObject: any = {};

    let key: any;

    for (key in original) {
        // copy each property into the clone
        clonedObject[key] = original[key];
    }

    return clonedObject;
}

export function clone<T>(obj: T): T {
    let copy: any;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' !== typeof obj) {
        return obj;
    }

    if (moment.isMoment(obj)) {
        copy = moment(obj);
        return copy;
    }

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = clone(obj[attr]);
            }
        }
        return copy;
    }

    throw new Error('Unable to copy obj! Its type isn\'t supported.');
}
