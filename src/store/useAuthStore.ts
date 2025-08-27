import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User, type IUser } from "../models/user.model";
import { httpCall } from "../api/commonApi";
import { QueryTypeEnum } from "../models/api.model";
import { sha512 } from "js-sha512";
import type { ILogin } from "../models/auth.model";

export interface IAuth {
  user: IUser | null;
  keepme: boolean;

  clear: () => void;
  loginAsync: (data: ILogin) => Promise<boolean>;
}

export const useAuthStore = create<IAuth>()( devtools(persist((set) => ({
        
		user: null,
		keepme: false,

		clear: () => set({ keepme: false, user: null }),

		loginAsync: async (data: ILogin): Promise<boolean> => {
			
			const authUser = await httpCall(QueryTypeEnum.auth, {
				name: data.name,
				h: sha512(data.passw),
			});

			console.log("login authUser", new User(authUser));

			if (authUser) {
				set({user: new User(authUser)});
				set({keepme: data.keepme});
				return true;
			}
			return false;
		},
	}),
	{
		name: "auth-storage",
	}
) ));


