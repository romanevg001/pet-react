
export interface IElement {
    clas: string;
    id: string;
    module: string;
    name: string;
    num: string;
    state: "normal";
    type: "dry";
    value: string;
    view: string;
}
export interface IGroup {
    descr: string;
    disable_startup: string;
    disabled: string;
    elements: string;//"107902,201901,202903,207904"
    id: string;
    modules: string; //"2003"
    name: string;
    notifiers: string;
    smask: string; //"2"
    state: string;//"normal"
    timeout: string;
}
export interface IModule {
    clas: string;
    id: string;
    name: string;
    pcode: string;
    sn: string;
    state: string;//"normal"
    type: string;//"devirt"
}

export interface IModules {
    brandext: string; 
    brandname: string; 
    brandpen: string; 
    can_count: string; 
    cpuusage: string; 
    dubl: string; 
    elements: {element: IElement[]}
    groups: {group: IGroup[]}
    hostname: string; 
    lora: string; //"false"
    memtotal: string; 
    memusage: string; 
    modules: {module: IModule[]}
    ntpserver: string; //"false"
    optime: string; 
    osdp: string; //"false"
    pdu: string; //"false"
    rtspcam: string; 
    sd_count: string; 
    sms: string; //"true"
    state: string; //"alarm"
    time: string; //"1753107693"
    type: string; //"VT335t"
    uptime: string; //"424523"
    version: string; //"7.2.4 b235"
}