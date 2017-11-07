import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { WorkoutsComponent } from "./containers/workouts/workouts.component";

export const ROUTES: Routes = [
	{ path: '', component: WorkoutsComponent }
]

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(ROUTES),
		ReactiveFormsModule
	],
	declarations: [
		WorkoutsComponent
	]
})
export class WorkoutsModule { }