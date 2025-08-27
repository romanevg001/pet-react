import { BaseModel } from "./base.model";

export interface IUser {
    k: string;
    id: string;
    name: string;

    has_sread: (pr?: UserPermitionsEnum) => boolean;
    has_swrite: (pr?: UserPermitionsEnum) => boolean;
    has_cread: (pr?: UserPermitionsEnum) => boolean;
    has_cwrite: (pr?: UserPermitionsEnum) => boolean;
    has_gread: (pr?: UserPermitionsEnum) => boolean;
    has_gwrite: (pr?: UserPermitionsEnum) => boolean;

}

export class User extends BaseModel implements IUser {
    k = '';
    id = '';
    name = '';
    
    private sread: UserPermitionsEnum[] = [];
    private swrite: UserPermitionsEnum[] = [];
    private cread: UserPermitionsEnum[] = [];
    private cwrite: UserPermitionsEnum[] = [];
    private gread: UserPermitionsEnum[] = [];
    private gwrite: UserPermitionsEnum[] = [];

    has_sread = (pr?: UserPermitionsEnum) => false;
    has_swrite = (pr?: UserPermitionsEnum) => false;
    has_cread = (pr?: UserPermitionsEnum) => false;
    has_cwrite = (pr?: UserPermitionsEnum) => false;
    has_gread = (pr?: UserPermitionsEnum) => false;
    has_gwrite = (pr?: UserPermitionsEnum) => false;


    constructor(o: any) {
        super();
        super.checkFields(o);
       

        const values =['sread', 'swrite', 'cread', 'cwrite', 'gread', 'gwrite'];
        values.forEach(prop=>{
            if(o[prop] && this[prop] && (typeof o[prop] == 'string')) {
                this[prop] = o[prop].split(',').filter(el=>el);
            }
        });
        values.forEach(prop=>{
            this['has_'+prop] = (pr?: UserPermitionsEnum): boolean => {
                if(pr) {
                    return this[prop].indexOf(pr) > -1;
                } else {
                    return this[prop].indexOf(UserPermitionsEnum.all) > -1;
                }
            }
        });
 
    }

    
}

export enum UserPermitionsEnum {
    all = "all",
    groups = "groups",
    accesskeys = 'accesskeys',
    canbus = 'canbus',
    relays = 'relays',
    log = 'log',
    logic = 'logic',
    cameras = 'cameras',
    users = 'users',
    view = 'view',
    elements = 'elements'
}
