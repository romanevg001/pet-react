import { httpCall } from "@/api/commonApi";
import { QueryTypeEnum } from "@/models/api.model";
import type { IModules } from "@/models/modules.model";
import { useQuery } from "@tanstack/react-query";

class UseSystreeQuery {

  getElement(id) {
    return useQuery({ 
      queryKey: [QueryTypeEnum.getelement,id], 
      enabled: !!id,
      queryFn: ()=> httpCall(QueryTypeEnum.getelement,{id}) ,
      staleTime: Infinity
    });
  }

  getModules() {
    return useQuery({ 
      queryKey: [QueryTypeEnum.getmodules], 
      queryFn: ()=> httpCall<IModules>(QueryTypeEnum.getmodules) ,
      staleTime: 15000,
      refetchInterval: 15000
    });
  }
    
}

export const useSystreeQuery = new UseSystreeQuery();
