
import { globalConst } from "../services/global.const";
import { QueryTypeEnum } from "../models/api.model";
import { useAuthStore } from "../store/useAuthStore";
import { BaseModel } from "@/models/base.model";

export async function  httpCall<T>(querytype: QueryTypeEnum, data?: object): Promise<T | null> {
    
    const user = useAuthStore.getState().user;

    if(!(querytype == QueryTypeEnum.auth || user)) return null;

    const params: object = {
        querytype,
        k: user?.k || 0,
        ...data
    };

    try {
        console.log('==httpCall== fetch',querytype);
        return await fetch(globalConst.engine +'/'+ querytype + (params['id'] ? '_' + params['id'] : '' )+'.xml', { 
            method: "POST",
            body: JSON.stringify(params),
        }).then(resp => resp.text()).then(xmlString=>{
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            const jsonObject = xmlToJson(xmlDoc.documentElement);

            if(!xmlString){
                throw new Error('empty');
            };
            console.log('==httpCall== jsonObject',jsonObject);
            return jsonObject as T;
        });
    } catch (e: any) {
        throw new Error(e);
    }

}

function xmlToJson(xml) {
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj[attribute.nodeName] = attribute.nodeValue;
            }
        }
    }

    // do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (nodeName != '#text') {;
                if (typeof(obj[nodeName]) == "undefined") {
                    
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (typeof(obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
    }
    return obj;
}

export type TMethod = "POST" | "GET" | "PUT" | "DELETE" | "PATCH" ;
export interface IOption {
    _page?: number;                      
    _per_page?: number;
    _start?: number;
    _limit?: number;
    _sort?: string; //=f1,f2
};

export interface IOption {
    _page?: number;                      
    _per_page?: number;
  /*   _start?: number;
    _limit?: number; */
    //_sort?: string; //=f1,f2
};

export class Option extends BaseModel implements IOption {
    _page = 1;
    _per_page = 10;
 /*    _start = 1;
    _limit = 10 */
    //_sort = '';
    constructor(o?,type: "full" | "reduce" = "full") {
        super();
        if(type =="reduce") {
            super.matchAndReduceFields(o);
        } else {
            super.checkFields(o);
        }
    }
};

export async function  httpCallJson<T>(url: string,     opt?: IOption                                                           ): Promise<T | null> 
export async function  httpCallJson<T>(url: string,     method?: TMethod,                   opt?: IOption                       ): Promise<T | null> 
export async function  httpCallJson<T>(url: string,     method?: TMethod,                   body?: any,         opt?: IOption    ): Promise<T | null> 
export async function  httpCallJson<T>(url: string,     methodOrOpt?: TMethod | IOption,    bodyOrOpt?: object,    opt?: IOption    ): Promise<T | null> {

        const isOpt = (o) => o && Object.keys(o).find(prop=> (new Option()).hasOwnProperty(prop))

        let defOpt: IOption | undefined = undefined;
        let _method = "GET";
        let _body: object | undefined = undefined;

        if(opt) {defOpt = new Option(opt)}

        if (isOpt(methodOrOpt)) {
            defOpt = new Option(methodOrOpt)
        } else {
            _method = methodOrOpt as string;
        };

        if(isOpt(bodyOrOpt)) {
            defOpt = new Option(bodyOrOpt);
        } else {
            _body = bodyOrOpt;
        }

        const _opt = defOpt ? Object.entries(defOpt).map(([key,value]) => key+'='+value).join('&') : '';
        

        console.log('==httpCallJson== fetch','http://localhost:3000/' + url + (_opt ? '?'+_opt : ''));
        console.log('==httpCallJson== _body',_body);

        const params = {   method:  _method   };
        if(_body) {
            params['body'] = JSON.stringify(_body);
        }


        return await fetch('http://localhost:3000/' + url + (_opt ? '?'+_opt : ''), params).then(resp => resp.json()).then(resp =>  {
            console.log('==httpCallJson== jsonObject',resp);
            return resp;
        });
      /*  try { } catch (e: any) {
        throw new Error(e);
    } */
}


