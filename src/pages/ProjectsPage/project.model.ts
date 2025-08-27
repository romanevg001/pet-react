import { BaseModel } from "@/models/base.model";

export interface ITask {
    id: string;
    name: string;
}

export interface IProject {
    id: string;
    title: string;
    desc: string;
    date: number;
    tasks: ITask[];
}


export class Project extends BaseModel implements IProject {
    id = String(Math.round(Math.random() * 10000));
    title = '';
    desc = '';
    date = Date.now()/1000;
    tasks = [];

    constructor(o) {
        super();
        super.checkFields(o);
    }
}