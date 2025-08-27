import { Dialog } from "primereact/dialog";
import { useState } from "react";
import type { IElement, IModule } from "../../models/modules.model";
import {SystreeListQueryComponent} from "./SystreeListQueryComponent";
import SystreeDialogQuery from "./SystreeDialogQuery";

export default function SystreePageQuery() {
  const [moduleDialogData, setModuleDialogData] = useState<IModule | null>(null);
  const [elementDialogData, setElementDialogData] = useState<IElement | null>(null);



  console.log('render SystreePage');



  return (<div>
    <h1>SystreePage</h1>
    <SystreeListQueryComponent setModuleDialogData={setModuleDialogData} setElementDialogData={setElementDialogData} />

    <Dialog header={moduleDialogData?.name} visible={Boolean(moduleDialogData)} style={{ width: '50vw' }} onHide={() => {if (!moduleDialogData) return; setModuleDialogData(null); }}>
      <div className="m-0">
          { moduleDialogData && Object.entries(moduleDialogData).map(([key,val])=>{
            return <dl key={key} className="flex"><dd className="w-6 ml-0">{key}</dd><dt>{val}</dt></dl>
          })}
      </div>
    </Dialog> 

    {elementDialogData && <SystreeDialogQuery elementDialogData={elementDialogData} setElementDialogData={setElementDialogData}></SystreeDialogQuery>}

  {/*   <Dialog header={elementDialogData?.name} visible={Boolean(elementDialogData)} style={{ width: '50vw' }} onHide={() => {if (!elementDialogData) return; setElementDialogData(null); }}>
      <div className="m-0">
          { elementDialogData && Object.entries(elementDialogData).map(([key,val])=>{
            return <dl key={key} className="flex"><dd className="w-6 ml-0">{key}</dd><dt>{val}</dt></dl>
          })}
      </div>
    </Dialog>  */}



  </div>);
}