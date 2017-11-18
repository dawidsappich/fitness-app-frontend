import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'schedules',
	styleUrls: ['schedules.component.scss'],
	templateUrl: 'schedules.component.html'
})
export class SchedulesComponent {

	date$: Observable<Date>;

	constructor() { }
	
}