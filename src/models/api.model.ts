export enum QueryTypeEnum {
    "auth" = "auth",
    "authpin" = "authpin",
    "getcan" = "getcan",
    "gettrace" = "gettrace",
    "getmodules" = "getmodules",
    "getelement" = "getelement",
    "todo" = "todo",
    "task" = "task",
    "deltask" = "deltask",
    "addtask" = "addtask",
}


export enum ElementClasEnum {
    "devirt" = "devirt",
    "notifier" = "notifier",
    "analog" = "analog",
    "switch" = "switch",
    "discrete" = "discrete",
    "devhwr" = "devhwr"
}

export enum ElementTypeEnum {
    "logic" = "logic",
    "ip-cam" = "ip-cam",
    "usb-cam" = "usb-cam",
    "lte state" = "lte state",
    "gsm state" = "gsm state",
    "signal" = "signal",
    "temperature" = "temperature",
    "relay" = "relay",
    "strobo" = "strobo",
    "voltage" = "voltage",
    "mailer" = "mailer",
    "sms" = "sms",
    "humidity" = "humidity",
    "dust" = "dust",
    "water" = "water",
    "trigger" = "trigger",
    "dry" = "dry"
}
 

// type


/* 
const m= import.meta.glob('./*.model.ts');
const env= import.meta.env;
const m2= import('./auth.model.ts');
console.log('1',m['./auth.model.ts']());
console.log('2',m2);
console.log('env',env);


 */