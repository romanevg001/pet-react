
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { IconField } from 'primereact/IconField';
import { InputIcon } from 'primereact/InputIcon';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import {useTranslation} from "react-i18next";
import { useState } from 'react';
import  { lang_settings } from '../i18n';
import { Button } from 'primereact/button';
import { useForm, Controller } from 'react-hook-form';
import { LoginModel } from "../models/auth.model";
import { errorHandler } from '../services/form.service';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';



export default function LoginPage() {
    const {t, i18n} = useTranslation();
	const navigate = useNavigate();
	const loginAsync = useAuthStore(state=>state.loginAsync)
	const { handleSubmit,  control } = useForm({
		defaultValues: new LoginModel(),
	});
	// @ts-ignore
	const [selectedLng, setSelectedLng] = useState<typeof lang_settings[keyof typeof lang_settings]>(lang_settings[i18n.language]);
    const langs = Object.values(lang_settings);

    const setLng = (lng: typeof lang_settings[keyof typeof lang_settings]) => {
		i18n.loadLanguages([lng.code]).then(() => {
        	i18n.changeLanguage(lng.code, (err, t) => {
            	if (err) return console.log('something went wrong loading', err);
				t(lng.code);
			});
			setSelectedLng(lng);
        });
    }



	const onSubmit = data => {
		loginAsync(data).then(t=>t && navigate('/'));
	};


    return (<div>
        <Card className="w-30rem m-auto" >

			<form onSubmit={handleSubmit(onSubmit)}>
			
				<Controller
					name="name"
					control={control}
					rules={{ required: true}}
					render={({ field, fieldState }) => (
						<IconField className='mb-3'>
							<InputIcon className="pi pi-user"></InputIcon>
							<InputText 
								{...field}
								placeholder={t('login.input_login')} 
								{...errorHandler(fieldState)}  
								className="w-full  p-inputtext-sm"
							/>
						</IconField>
					)} 
				/>
			
				<Controller
					name="passw"
					control={control}
					rules={{ required: true }}
					render={({ field, fieldState }) => (
						<IconField className='mb-3'>
							<InputIcon className="pi pi-lock"></InputIcon>
							<InputText 
								type="password" 
								{...field}
								{...errorHandler(fieldState)}  
								placeholder={t('login.input_passw')} 
								className="w-full p-inputtext-sm"
							/>
						</IconField>
					)} 
				/>

				 <Dropdown name="lngcur" value={selectedLng} onChange={(e) => setLng(e.value)} options={langs} optionLabel="name" className="w-full mb-3 p-inputtext-sm" />
			 
				<div className="flex justify-content-between">
					<div className="flex align-items-center">
						<Controller 
							name="keepme" 
							control={control}
							render={({ field }) => (<Checkbox {...field} inputId={field.name} onChange={(e) => field.onChange(e.checked)} checked={field.value} />)}
						/>
						<label htmlFor='keepme' className="ml-2">{t('login.input_keep')}</label>
					</div>
					
					<Button label={t('login.btn_login')} size="small" />
				</div> 
			</form>
        </Card>
    </div>);
}
/* 
.login-logo
	a(ng-href="{{ logo.url }}"): img(src="{{ logo.src }}", alt="{{ logo.alt }}")
.login-box-body
	form(name="controls.formLogin")
		.form-group.has-feedback
			input.form-control(autocapitalize="off", type="text", name="login", placeholder="{{ 'login.input_login' | translate }}", ng-model="form.login", v-not-empty)
			span.glyphicon.glyphicon-user.form-control-feedback
		.form-group.has-feedback
			input.form-control(autocapitalize="off", type="password", name="passw", placeholder="{{ 'login.input_passw' | translate }}", ng-model="form.passw", v-not-empty)
			span.glyphicon.glyphicon-lock.form-control-feedback
		.form-group
			select.form-control(name="lngcur", ng-model="form.lng", ng-options="key as value.name for (key, value) in langs", ng-change="setLng()")
		.row
			.col-xs-8.col-xxs-12
				.checkbox.icheck
					label
						input(i-check, type="checkbox", name="keepme", ng-model="form.keepme", ng-true-value="1", ng-false-value="0")
						span  {{ 'login.input_keep' | translate }}
			.col-xs-4.col-xxs-12
				button.btn.btn-primary.btn-flat(ng-click="systemLogin()", translate="login.btn_login")
 */