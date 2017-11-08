import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { MealsModule } from "./meals/meals.module";

import { AuthGuard } from "../auth/shared/guards/auth.guard";

export const ROUTES: Routes = [
	// lazy load module
	{ path: 'schedule', canDeactivate: [AuthGuard], loadChildren: './schedules/schedules.module#SchedulesModule' },
	{ path: 'meals', canDeactivate: [AuthGuard], loadChildren: './meals/meals.module#MealsModule' },
	{ path: 'workouts', canDeactivate: [AuthGuard], loadChildren: './workouts/workouts.module#WorkoutsModule' },
]

@NgModule({
	imports: [
		RouterModule.forChild(ROUTES)
	]
})
export class HealthModule { }