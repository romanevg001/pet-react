
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import type { IElement, IModule } from "../../models/modules.model";
import {SystreeListComponent} from "./SystreeListComponent";

export default function SystreeLogicDialog() {
  const [elementDialogData, setElementDialogData] = useState<IElement | null>(null);

  console.log('render')


  return (

    <Dialog header={elementDialogData?.name} visible={Boolean(elementDialogData)} style={{ width: '50vw' }} onHide={() => {if (!elementDialogData) return; setElementDialogData(null); }}>
      <div className="m-0">
          { elementDialogData && Object.entries(elementDialogData).map(([key,val])=>{
            return <dl key={key} className="flex"><dd className="w-6 ml-0">{key}</dd><dt>{val}</dt></dl>
          })}
      </div>
    </Dialog> 

  );
}