import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../auth/shared/shared.module";

export const ROUTES: Routes = [
	{
		path: 'auth',
		children: [
			{ path: '', pathMatch: 'full', redirectTo: 'login' },
			// lazy load modules
			{ path: 'login', loadChildren: './login/login.module#LoginModule' },
			{ path: 'register', loadChildren: './register/register.module#RegisterModule' }
		]
	}
]

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(ROUTES),
		// avoid duplicate instance with forRoot
		SharedModule.forRoot()
	],
})
export class AuthModule { }