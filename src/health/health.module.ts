import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "./shared/shared.module";

import { AuthGuard } from "../auth/shared/guards/auth.guard";

export const ROUTES: Routes = [
	// lazy load module
	{ path: 'schedule', loadChildren: './schedules/schedules.module#SchedulesModule' },
	{ path: 'meals', loadChildren: './meals/meals.module#MealsModule' },
	{ path: 'workouts', loadChildren: './workouts/workouts.module#WorkoutsModule' },
]

@NgModule({
	imports: [
		RouterModule.forChild(ROUTES),
		SharedModule.forRoot()
	]
})
export class HealthModule { }