import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';

import { Workout } from "../../../../app/containers/models/workout";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "../../../../auth/service/auth.service";
import { WorkoutsService } from "../../../shared/services/workouts/workouts.service";


@Component({
	selector: 'workout',
	styleUrls: ['workout.component.scss'],
	templateUrl: 'workout.component.html'
})
export class WorkoutComponent implements OnInit {

	userEmail: string;
	subscription: Subscription;
	workout$: Observable<Workout>;

	constructor(
		private workoutsService: WorkoutsService,
		private authService: AuthService,
		private router: Router,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.workout$ = this.route.params
			.switchMap(param => this.workoutsService.getWorkout(param.id))
	}

	addnewWorkout(meal: Workout) {
		this.subscription = this.authService.getUser()
			.switchMap(user => {
				let email = user.email;
				const workoutObj = { ...meal, email };
				return this.workoutsService.addNewWorkout(workoutObj)
			})
			.subscribe()
		this.backToWorkouts();
	}

	backToWorkouts() {
		this.router.navigate(['workouts']);
	}

	updateWorkout(workout: Workout) {
		const id = this.route.snapshot.params.id
		this.workoutsService.updateWorkout(id, workout).subscribe();
		this.backToWorkouts();
	}

	removeWorkout(event: Workout) {
		console.log(event)
	}

}