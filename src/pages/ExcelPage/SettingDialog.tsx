import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useDispatch } from "react-redux";
import { excelSlice } from "@/reduxstore/excel-slice";
import { headerRuleDefault, TypesEnum, type ICellData } from "./excelPage.model";
import { CreateDictionary } from "./CreateDictionary";



export interface ISettingDialog {
  open: (data: any) => void;
}


const SettingDialog = forwardRef<ISettingDialog>(({  }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const dispatch = useDispatch();
    
    const [cellData,setCellData] = useState<ICellData>();

    useImperativeHandle(ref, () => ({
      open: (data:ICellData) => {
        setCellData(data);

        dialogRef.current?.showModal()
        },
    }));

    const close = () => {
        dialogRef.current?.close();
    }

    function save() {
        dispatch(excelSlice.actions.setHeaderSettings(cellData));
        close();
    }


    console.log('<SettingDialog> render',cellData);

    

    return createPortal(
      <dialog ref={dialogRef} className="w-5 h-4">
        <form method="dialog" className="flex justify-content-between align-items-baseline">
          <p>{cellData?.value}</p>
          <button >&times;</button>
        </form>
        <div className="flex justify-content-between align-items-baseline w-full mb-4">
            <label>Field type:</label>
            <select onChange={(e)=>setCellData((d)=>({...d, rules: headerRuleDefault[e.target.value]}))}>
                {Object.keys(TypesEnum)?.map(el => <option selected={el==cellData?.rules?.type}>{el}</option>)}
            </select>
        </div>
        <div className="flex justify-content-between align-items-baseline w-full mb-4">
            <label>Field rules:</label>
            {cellData?.rules?.type == TypesEnum.restrict_number && <div>
              <span>Min value: <input type="number" defaultValue={cellData?.rules.dataRules.min} /></span>
              <span>Max value: <input type="number" defaultValue={cellData?.rules.dataRules.max} /></span>
            </div>}
            {cellData?.rules?.type == TypesEnum.list && <div>
              <CreateDictionary defaultValue={cellData?.rules.dataRules}/>
            </div>}
        </div>
        <button onClick={save}>Save</button>
      </dialog>,
      document.getElementById("modal")
    );
  }
);

export default SettingDialog;
