import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { MealsModule } from "./meals/meals.module";

export const ROUTES: Routes = [
	// lazy load module
	{ path: 'schedule', loadChildren: './schedules/schedules.module#SchedulesModule' },
	{ path: 'meals', loadChildren: './meals/meals.module#MealsModule' },
	{ path: 'workouts', loadChildren: './workouts/workouts.module#WorkoutsModule' },
]

@NgModule({
	imports: [
		RouterModule.forChild(ROUTES)
	]
})
export class HealthModule { }