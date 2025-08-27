/* import { redirect } from "react-router-dom";
import { httpCallInit } from "../api/commonApi";
import type { ILogin } from "../models/auth.model";
import { User } from "../models/user.model";
 import { useAuthStore } from "../store/useAuthStore";
import { QueryTypeEnum } from "../models/api.model"; 
import { sha512 } from 'js-sha512';


export function useAuthService() {
	const {setUser, setKeepme, clear, user} = useAuthStore();
	const httpCall = httpCallInit(user);

	const login =  async (data: ILogin): Promise<void> => {
		
		const authUser = await httpCall(QueryTypeEnum.auth, {
			name: data.name,
			h: sha512(data.passw)
		});
		
		console.log('login user', user);
		console.log('login authUser', new User(authUser));
		
		if(authUser) {
			setUser(new User(authUser));
			setKeepme(data.keepme); 
			redirect('/')
		}
	}

	const logout = () => {
		clear(); 
	}


	return {
		login,
		logout
	}
}

 */