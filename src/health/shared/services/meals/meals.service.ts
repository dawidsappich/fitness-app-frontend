import { Injectable } from '@angular/core';
import { AuthService } from "../../../../auth/service/auth.service";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';


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

	addNewMeal() {
		return true;
	}

}