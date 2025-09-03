import type { RadioButtonChangeEvent } from "primereact/radiobutton";
import { useEffect, useState } from "react";

export interface IFormHook {
    [key:string] : any;
}

export default function useFormCustom<T>(initData: T | undefined) {
    const  [formState, setFormDataState] = useState<T>({} as T);

    useEffect(()=>{
        if(initData) {setFormDataState(initData)}
    },[initData])


    function setFormState(fData: Partial<T>) {
        setFormDataState((state)=>({...state, ...fData}));
    }

   const formStateEvents = {
    fieldName: '',
    onChange: (e) => {
        const fieldName = e?.target?.name || formStateEvents.fieldName;
        const fieldValue =  ((e.target?.type == "checkbox" ) ? e?.target.checked ?? e?.checked : e.target?.value ?? e?.value ?? e?.target.checked ?? e?.checked );
        console.log('useFormCustom: formStateEvents: onChange', fieldName,':',fieldValue,' =>> ', e, e.target?.type == "checkbox", e?.target.checked );
        if(fieldName) {
            setFormState({[fieldName]: fieldValue } as Partial<T>)}
            formStateEvents.fieldName = '';
        }
   }

    return {
        formState,
        setFormState,
        formStateEvents
    }

}