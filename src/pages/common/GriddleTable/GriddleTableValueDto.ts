
export class GriddleTableValueDto {

    public einheitAsString: string;
    public type: string;
    public data: any;

    public constructor(einheitAsString: string, type: string, data: any) {
        this.einheitAsString = einheitAsString;
        this.type = type;
        this.data = data;
    }

}
