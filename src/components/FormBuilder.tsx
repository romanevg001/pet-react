import { Calendar,type CalendarBaseProps } from "primereact/calendar";
import { InputNumber, type InputNumberProps } from "primereact/inputnumber";
import { InputText, type InputTextProps } from "primereact/inputtext";



export enum FormFieldTypeEnum {
    "calendar",
    "text",
    "number"
}


interface IFormBuilderProps {
    config: {
        [key: string]:  { type: FormFieldTypeEnum.calendar; options?: CalendarBaseProps, label: string }
                    |   { type: FormFieldTypeEnum.number; options?: InputNumberProps , label: string}
                    |   { type: FormFieldTypeEnum.text; options?: InputTextProps, label: string }
    }
}



export function FormBuilder({config}:IFormBuilderProps) {
    const fields = Object.entries(config)
    return (
        <>
            {
                fields.map(([name,value]) =>(
                    <div className="flex flex-column gap-2 mb-3">
                        <label htmlFor={name}>{value.label}</label>
                        {
                                value.type == FormFieldTypeEnum.calendar && <Calendar name={name} id={name} {...value.options} />
                            ||  value.type == FormFieldTypeEnum.number && <InputNumber name={name} id={name} {...value.options} />
                            ||  value.type == FormFieldTypeEnum.text && <InputText name={name} id={name} {...value.options} />
                        }
                        {/* <small id="username-help">
                            Enter your username to reset your password.
                        </small> */}
                    </div>
                ))
            }
            
        </>
    );
}
