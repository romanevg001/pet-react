import { useHeaderMessages } from "@/hooks/useHeaderMessages";
import { useRef, useState } from "react";
import Cell from "./Cell";
import type { ISettingDialog } from "./SettingDialog";
import SettingDialog from "./SettingDialog";
import { useDispatch, useSelector } from "react-redux";
import type { IStoreState } from "@/reduxstore";
import { excelSlice } from "@/reduxstore/excel-slice";
import type { IcsvParser } from "./excelPage.model";
import { csvParser } from "./CSVParser";



export default function ExcelPage() {
  const { addMessage } = useHeaderMessages();
  const dialogRef = useRef<ISettingDialog>(null);
  const dispatch = useDispatch();
  const {rows, headerRules} = useSelector<IStoreState, IcsvParser>((state) => state.excel.data);

  
    console.log('<ExcelPage /> render')

  function loadFile(e) {
    const file = e.target.files[0];
    if (!file) {   return; }
    const reader = new FileReader();
    reader.onload = () => {
        const res = csvParser(reader.result);
        console.log(res);
        dispatch(excelSlice.actions.setFileData(res))
    };
    reader.onerror = (e) => {
      addMessage({ severity: "error",   detail: "Error reading the file. Please try again."  });
    };
    reader.readAsText(file); 
  }

  return (
    <>
      <div className="m-4"><input type="file" accept=".csv" onChange={loadFile} /></div>

      {!!rows.length && <div className="csv-table">
        
        {rows.map((row,row_i) => (
          <div className={"row  " + ((row_i==0) ? 'csv-table-header':'')} key={'row_' + row_i} >
            {row.map((cell,cell_i) => (
                <div key={'cell_' + cell_i} className="cell" style={{'width': (100/row.length)+'%'}}>
                    {row_i == 0 && <div className="setting" onClick={()=>{dialogRef.current?.open({value:cell,rules:headerRules[cell_i], position: cell_i});}}></div>}
                    {(row_i == 0 || cell_i == 0) ? cell : <Cell value={cell} rules={headerRules[cell_i]} />}
                </div>
            ))}
          </div>
        ))} 
      </div>}

      <SettingDialog ref={dialogRef}></SettingDialog>

    </>
  );
}
