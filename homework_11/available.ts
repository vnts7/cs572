export function addAvailability(value: boolean) {
    return function (tClass: any) {
        // tClass.prototype.available = value;
        return class {
            available = value;
        }
    }
}