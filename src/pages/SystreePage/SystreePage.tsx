import { Dialog } from "primereact/dialog";
import { useState } from "react";
import type { IElement, IModule } from "../../models/modules.model";
import {SystreeListComponent} from "./SystreeListComponent";
import SystreeDialog from "./SystreeDialog";

export default function SystreePage() {
  const [moduleDialogData, setModuleDialogData] = useState<IModule | null>(null);
  const [elementDialogData, setElementDialogData] = useState<IElement | null>(null);



  console.log('render SystreePage');



  return (<div>
    <h1>SystreePage</h1>
    <SystreeListComponent setModuleDialogData={setModuleDialogData} setElementDialogData={setElementDialogData} />

    <Dialog header={moduleDialogData?.name} visible={Boolean(moduleDialogData)} style={{ width: '50vw' }} onHide={() => {if (!moduleDialogData) return; setModuleDialogData(null); }}>
      <div className="m-0">
          { moduleDialogData && Object.entries(moduleDialogData).map(([key,val])=>{
            return <dl key={key} className="flex"><dd className="w-6 ml-0">{key}</dd><dt>{val}</dt></dl>
          })}
      </div>
    </Dialog> 

    {elementDialogData && <SystreeDialog elementDialogData={elementDialogData} setElementDialogData={setElementDialogData}></SystreeDialog>}

  {/*   <Dialog header={elementDialogData?.name} visible={Boolean(elementDialogData)} style={{ width: '50vw' }} onHide={() => {if (!elementDialogData) return; setElementDialogData(null); }}>
      <div className="m-0">
          { elementDialogData && Object.entries(elementDialogData).map(([key,val])=>{
            return <dl key={key} className="flex"><dd className="w-6 ml-0">{key}</dd><dt>{val}</dt></dl>
          })}
      </div>
    </Dialog>  */}



  </div>);
}