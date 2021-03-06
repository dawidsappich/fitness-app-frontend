import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { MealsService } from "./services/meals/meals.service";

import { ListItemComponent } from "./components/list-item/list-item.component";
import { WorkoutsService } from './services/workouts/workouts.service';

import { JoinPipe } from "./pipes/join.pipe";
import { WorkoutPipe } from "./pipes/workout.pipe";

@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [ListItemComponent, JoinPipe, WorkoutPipe],
	exports: [ListItemComponent, JoinPipe, WorkoutPipe],
	providers: []
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [MealsService, WorkoutsService]
		}
	}
}