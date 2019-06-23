import { ValueDto } from './ValueDto';

export class MonthViewDataDto {

    public values: {[key: string]: ValueDto[]};
    public displayedNames: {[key: string]: string};

}
