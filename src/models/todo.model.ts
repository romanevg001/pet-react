import { BaseModel } from "./base.model";

export interface ITask {
    i?: number;
    id: string;
    name: string;
    count: number;
    unit: UnitEnum;
    done: boolean;
    start: Date;
    end: Date;
}

export enum UnitEnum {
    "peace" = "peace",
    "kilo" = "kilo",
    "litr" = "litr"
}

export class Task extends BaseModel implements ITask {
    id = String(Math.round(Math.random() * 10000));
    name = "";
    count = 0;
    unit = UnitEnum.peace;
    done = false;
    start = new Date();
    end = new Date(Number(Date.now()) + 600000000);

    constructor(o?: any) {
        super();
        super.checkFields(o);

    }
}

export interface IResGetTodo {
    data: ITask[];
    first: number;
    items: number;
    last: number;
    next: number;
    pages: number;
    prev: number;
}

export enum TaskColumnsEnum {
    name = 0,
    count,
    unit,
    start,
    end
}

export namespace TaskColumnsEnum {
    export const arraylike = () => {
        const arr = Object.entries(TaskColumnsEnum)
        return arr.slice(0,arr.length/2);
    }
}



