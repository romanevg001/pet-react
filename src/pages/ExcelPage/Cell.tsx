import { TypesEnum, type THeaderRule } from "./excelPage.model";

export interface ICellProps {
    value: any;
    rules: THeaderRule;
}

export default function Cell({value, rules}: ICellProps) {
    return (<>
        {(rules.type == TypesEnum.string) && <input type="text" defaultValue={value} /> }
        {(rules.type == TypesEnum.number) && <input type="number" defaultValue={value} /> }
        {(rules.type == TypesEnum.restrict_number) && <input type="number" defaultValue={value} min={rules?.dataRules.min} max={rules.dataRules.max} /> }

        {(rules.type == TypesEnum.list) && <select>{rules?.dataRules?.map(el => <option selected={el==value}>{el}</option>)}</select> }

        {(rules.type == TypesEnum.currency) && <input type="number" defaultValue={value} /> }

    </>);
}