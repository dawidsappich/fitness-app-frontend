import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

import { WorkoutsService } from "../../../shared/services/workouts/workouts.service";
import { AuthService } from "../../../../auth/service/auth.service";

import { Workout } from "../../../../app/containers/models/workout";
import { Member } from "../../../../app/containers/models/user";

@Component({
	selector: 'workouts',
	styleUrls: ['workouts.component.scss'],
	templateUrl: 'workouts.component.html'
})
export class WorkoutsComponent implements OnInit {

	workouts$: Observable<Workout>;
	user: string;

	constructor(
		private workoutsService: WorkoutsService,
		private authService: AuthService
	) { }

	ngOnInit() {
		// get the actual user from the store to get a list of meals from the database
		this.authService.getUser().subscribe((user: Member) => this.user = user.email);
		this.workouts$ = this.workoutsService.getWorkouts(this.user);
	}

	removeWorkout(workoutId: any) {
		console.log(workoutId)
		this.workoutsService.removeWorkout(workoutId._id)
			.subscribe(() => { this.workouts$ = this.workoutsService.getWorkouts(this.user) })
	}
}