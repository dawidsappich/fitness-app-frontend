import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from "@angular/http";


import { AuthFormComponent } from './components/auth-form/auth-form.component';

import { ReactiveFormsModule } from "@angular/forms";

import { AuthService } from "../service/auth.service";
import { AuthGuard } from "../shared/guards/auth.guard";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		HttpModule
	],
	declarations: [
		AuthFormComponent
	],
	exports: [AuthFormComponent]
})
export class SharedModule {
	/**
	 * instead for providing the Auhtservice with each Instance of the Sharedmdoule
	 * we provide it as a Singleton trough a static callback function forRoot
	 * wich is called form the AuhtModule
	 */
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [
				AuthService,
				AuthGuard
			]
		}
	}
}