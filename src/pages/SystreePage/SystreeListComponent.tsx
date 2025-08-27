import { PanelMenu } from "primereact/panelmenu";
import { useModulesStore } from "../../store/useModulesStore";
import type { MenuItem } from "primereact/menuitem";
import type { IElement, IModule } from "@/models/modules.model.ts";
import React from "react";
import { useQuery } from "@tanstack/react-query";

export interface ISystreeListComponentProps {
    setModuleDialogData: React.Dispatch<React.SetStateAction<IModule | null>>;
    setElementDialogData: React.Dispatch<React.SetStateAction<IElement | null>>;
}

export const SystreeListComponent = React.memo(({setModuleDialogData, setElementDialogData}:ISystreeListComponentProps) => {
  const modules = useModulesStore(state=>state.modules);


  console.log('render SystreeListComponent')


  const itemRenderer = (item, options) => (
      <div className="flex align-items-center px-3 py-2 cursor-pointer">
          <a className={`mx-2 flex ${item.items && 'font-semibold'}`} >
            {item.isGroup && <span className={'pi text-lg mr-2 ' +(options.active ? 'pi-angle-down': 'pi-angle-right')}></span>}
            <span>{item.label}</span>
          </a>
          
          
          {item.icon && <span className={`${item.icon} text-primary ml-auto`}  onClick={(e)=>{ e.preventDefault(); e.stopPropagation(); setModuleDialogData(item.data)}} />}
      </div>
  );

  const items: MenuItem[] = modules?.modules.module.map(m=>({
      label: m.name,
      icon: 'pi pi-file-edit',
      isGroup: true,
      template: itemRenderer,
      expanded: true,
      data: m,

      items: modules?.elements?.element.filter(el=> el.module == m.id).map(el => ({
        label: el.name,
        template: itemRenderer,
        command: () =>{
            console.log('setElementDialogData',el)
            setElementDialogData(el);
        },
      })) || []
  })) || [];


  return (<PanelMenu model={items} multiple={true} className="w-full" />);
});