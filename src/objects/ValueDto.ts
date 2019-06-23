
export class ValueDto {
    public value: string;
    public date: number;

    constructor(value: string, date: number) {
        this.date = date;
        this.value = value;
    }
}
