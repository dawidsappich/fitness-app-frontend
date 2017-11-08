import { Injectable } from '@angular/core';
import { AuthService } from "../../../../auth/service/auth.service";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable } from "rxjs/Observable";

import { Meal } from "../../../../app/containers/models/meal";

import { Store } from 'store';

@Injectable()
export class MealsService {

	private domain = 'http://localhost:7777';
	private options: RequestOptions;

	meals$: Observable<Meal>;

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
		this.meals$ = this.getmeals()
	}

	getmeals(): Observable<any> {
		let url = `${this.domain}/api/v1/meal`
		return this.http.get(url, this.options).map(res => res.json());
	}

}