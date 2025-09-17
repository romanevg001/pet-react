import { useHeaderMessages } from "@/hooks/useHeaderMessages";
import { csvParser, type THeaderRule } from "./csvParser";
import { useState } from "react";
import Cell from "./Cell";


let _headerRules:THeaderRule[]= [];

export default function ExcelPage() {
  const { addMessage } = useHeaderMessages();
  const [rows,setRows] = useState<string[][]>([]);


  function loadFile(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
        const {rows, headerRules} = csvParser(reader.result);
        _headerRules = headerRules;
        setRows(rows);
    };
    reader.onerror = (e) => {
      addMessage({
        severity: "error",
        detail: "Error reading the file. Please try again.",
      });
    };
    reader.readAsText(file);
  }
            //    <div className="csv-table-header" key={'h_' + i} style={{'width': (100/tableHeader.length)+'%'}}>{cell}</div>

  return (
    <>
      <div className="m-4"><input type="file" accept=".csv" onChange={loadFile} /></div>

      <div className="csv-table">
        
        {rows.map((row,i) => (
          <div className={"row  " + ((i==0) ? 'csv-table-header':'')} key={'row_' + i} >
            {row.map((cell,j) => (
                <div key={'cell_' + j} className="cell" style={{'width': (100/row.length)+'%'}}>
                    {(i == 0 || j == 0) ? cell : <Cell value={cell} rules={_headerRules[j]} />}
                </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
