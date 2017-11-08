import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { MealsService } from "./services/meals/meals.service";

@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [],
	providers: []
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [MealsService]
		}
	}
}