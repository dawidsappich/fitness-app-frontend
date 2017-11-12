import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { MealsService } from "./services/meals/meals.service";

import { ListItemComponent } from "./components/list-item/list-item.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [ListItemComponent],
	exports: [ListItemComponent],
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