import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { SchedulesComponent } from "./containers/schedules/schedules.component";

export const ROUTES: Routes = [
	{ path: '', component: SchedulesComponent }
]

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(ROUTES),
		ReactiveFormsModule
	],
	declarations: [
		SchedulesComponent
	]
})
export class SchedulesModule { }