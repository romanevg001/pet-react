import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { httpCall } from "../api/commonApi";
import { QueryTypeEnum } from "../models/api.model";
import type { IModules } from "../models/modules.model";

export interface IModulesStore {
  modules: IModules | null;

  clear: () => void;
  getModulesAsync: () => Promise<void>;
}

export const useModulesStore = create<IModulesStore>()( devtools((set) => ({
        
        modules: null,

        clear: () => set({ modules: null }),

        getModulesAsync: async (): Promise<void> => {
            
            const modules = await httpCall(QueryTypeEnum.getmodules) as IModules;

            set({modules});

        },
    }),
    {
        name: "modules-storage",
    }
) );


