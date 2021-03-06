import { Injectable } from '@angular/core';
import { AuthService } from "../../../../auth/service/auth.service";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


import { Meal } from "../../../../app/containers/models/meal";
import { Member } from "../../../../app/containers/models/user";

import { Store } from 'store';

@Injectable()
export class MealsService {

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

	getmeals(user: string): Observable<any> {
		let url = `${this.domain}/api/v1/meal/${user}`;
		return this.http.get(url, this.options).map(res => res.json());
	}

	getMeal(mealId: string) {
		if (!mealId) return Observable.of({});

		let url = `${this.domain}/api/v1/meal/entry/${mealId}`;
		return this.http.get(url, this.options).map(res => res.json())
	}

	addNewMeal(meal: Meal) {
		let url = `${this.domain}/api/v1/meal/new`;
		return this.http.post(url, meal, this.options).map(res => res.json());
	}

	updateMeal(id: string, meal: Meal) {
		let url = `${this.domain}/api/v1/meal/update/${id}`;
		return this.http.post(url, meal, this.options).map(res => res.json());
	}

	removeMeal(mealId: string) {
		let url = `${this.domain}/api/v1/meal/${mealId}`;
		return this.http.delete(url, this.options).map(res => res.json());
	}

}