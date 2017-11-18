import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

// components
import { ScheduleCalendarComponent } from "./components/schedule-calendar/schedule-calendar.component";
import { ScheduleDaysComponent } from "./components/schedule-days/schedule-days.component";
import { ScheduleContorlsComponent } from "./components/schedule-contorls/schedule-controls.component";


// containers
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
		SchedulesComponent,
		ScheduleCalendarComponent,
		ScheduleContorlsComponent,
		ScheduleDaysComponent
	]
})
export class SchedulesModule { }