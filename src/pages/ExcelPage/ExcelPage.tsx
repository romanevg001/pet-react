import { useHeaderMessages } from "@/hooks/useHeaderMessages";
import { csvParser } from "./csvParser";
import { useState } from "react";
import Cell from "./Cell";

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
        setRows(csvParser(reader.result));
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
      <input type="file" accept=".csv" onChange={loadFile} />
      <div className="csv-table">
        
        {rows.map((row,i) => (
          <div className={"flex " + ((i==0) ? 'csv-table-header':'')} key={'row_' + i} >
            {row.map((cell,j) => (
                <div key={'cell_' + j} style={{'width': (100/row.length)+'%'}}>
                    <Cell value={cell} />
                </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
