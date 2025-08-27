
import { Dialog } from "primereact/dialog";
import { type Dispatch, type SetStateAction } from "react";
import type { IElement } from "../../models/modules.model";
import { useSystreeQuery } from "@/query/useSystreeQuery";
import { useHeaderMessages } from "@/hooks/useHeaderMessages";

export default function SystreeDialogQuery({elementDialogData, setElementDialogData}: {elementDialogData: IElement | null, setElementDialogData: Dispatch<SetStateAction<IElement | null>>}) {
    const { addMessage } = useHeaderMessages();
    const { data: elementData, isLoading, isError} = useSystreeQuery.getElement(elementDialogData?.id);


    console.log('render SystreeDialog elementData',elementData, isError);


    if (isLoading) {
        return 'Loading element data...'
    }
 
    if (isError) {
        addMessage({severity: 'error', detail: 'Element '+elementDialogData?.id+' not found'})
        return '';
    }


  return (

    elementData && <Dialog header={elementData?.name} visible={Boolean(elementData)} style={{ width: '50vw' }} onHide={() => {if (!elementData) return; setElementDialogData(null); }}>
      <div className="m-0">
          { elementData && Object.entries(elementData).map(([key,val])=>{
            return <dl key={key} className="flex"><dd className="w-6 ml-0">{key}</dd><dt>{val}</dt></dl>
          })} 
      </div>
    </Dialog> 

  );
}