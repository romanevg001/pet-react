import { BaseModel } from "@/models/base.model";

export enum TypesEnum {
    'string' = 'string',
    'currency' = 'currency',
    'number' = 'number',
    'restrict_number' = 'restrict_number',
    'calendar' = 'calendar',
    'list' = 'list',
    'gap' = 'gap'
}

export type THeaderRule = {
    type: TypesEnum,
    dataRules: any | undefined
}
| {type: TypesEnum.restrict_number, dataRules: {min: number, max: number }}
| {type: TypesEnum.list, dataRules: string[]}
;


export const headerRuleDefault ={
    [TypesEnum.string]: {type: TypesEnum.string, dataRules: undefined},
    [TypesEnum.restrict_number]: {type: TypesEnum.restrict_number, dataRules: {min: 0, max: 5 }},
    [TypesEnum.list]: {type: TypesEnum.string, dataRules: []},
}

export interface IcsvParser {
    rows: string[][];
    headerRules: THeaderRule[];
}

export interface ICellData {
    value:string;
    rules: THeaderRule;
    position: number
}

/* export class CellData extends BaseModel {
    value = '';
    rules = {type: TypesEnum.string, dataRules: undefined};
    position = 0;

    constructor(o?: ICellData) {
        super();
        o?.rules
headerRuleDefault
    }
} */
