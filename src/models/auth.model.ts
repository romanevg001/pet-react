import { BaseModel } from "./base.model";

export interface ILogin {
	name: string;
	passw: string;
	keepme: boolean;
}

export class LoginModel extends BaseModel  implements ILogin {
    name = '';
    passw = '';
    keepme = false;

    constructor(o?: any) {
        super();
        super.checkFields(o);
    }
}