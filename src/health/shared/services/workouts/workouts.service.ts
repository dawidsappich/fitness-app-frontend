import { Injectable } from '@angular/core';
import { AuthService } from "../../../../auth/service/auth.service";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


import { Workout } from "../../../../app/containers/models/workout";
import { Member } from "../../../../app/containers/models/user";

import { Store } from 'store';

@Injectable()
export class WorkoutsService {

	private domain = 'http://localhost:7777';
	private options: RequestOptions;

	constructor(
		private store: Store,
		private authService: AuthService,
		private http: Http

	) {
		this.init();
	}

	init() {
		this.options = new RequestOptions({
			headers: new Headers({
				'content-type': 'application/json'
			})
		});
	}

	getWorkouts(user: string): Observable<any> {
		let url = `${this.domain}/api/v1/workout/${user}`;
		return this.http.get(url, this.options).map(res => res.json());
	}

	getWorkout(workoutId: string) {
		if (!workoutId) return Observable.of({});

		let url = `${this.domain}/api/v1/workout/entry/${workoutId}`;
		return this.http.get(url, this.options).map(res => res.json())
	}

	addNewWorkout(workout: Workout) {
		let url = `${this.domain}/api/v1/workout/new`;
		return this.http.post(url, workout, this.options).map(res => res.json());
	}

	updateWorkout(id: string, workout: Workout) {
		let url = `${this.domain}/api/v1/workout/update/${id}`;
		return this.http.post(url, workout, this.options).map(res => res.json());
	}

	removeWorkout(workoutId: string) {
		let url = `${this.domain}/api/v1/workout/${workoutId}`;
		return this.http.delete(url, this.options).map(res => res.json());
	}

}