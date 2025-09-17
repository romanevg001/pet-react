
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


export function csvParser(fileText: string | ArrayBuffer | null) {
    const str = String(fileText).split("\n");
    const rows = str.map(line => line?.split(';'));

    const headerRules: THeaderRule[] = rows[0].map(cell => {

        const str = cell.slice(cell.indexOf('[')+1,cell.lastIndexOf(']'));

        let [_type,ruleStr] = str.split(',[');
        if (ruleStr) { ruleStr = ruleStr.slice(0,-1); }

        
        const type: TypesEnum = TypesEnum[_type] || TypesEnum.string;
        let dataRules: any = undefined;

        if(type == TypesEnum.list) {
            dataRules = ruleStr.split(',');
        }
        if(type == TypesEnum.restrict_number) {
            const _dataRules = ruleStr.split(',').map(el=>Number(el));
            dataRules = _dataRules.length == 2 ? {min:_dataRules[0], max: _dataRules[1]} : undefined;
        }

        return {type, dataRules}
    });

    rows[0] = rows[0].map(cell => cell.split('[')[0]);


  console.log({rows, headerRules});
  return {rows, headerRules};
}
