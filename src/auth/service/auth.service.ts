import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

// store
import { Store } from 'store';

// rxjs
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
// JSON Web Token
import { tokenNotExpired } from 'angular2-jwt';
// Inteface
import { User, Member } from "../../app/containers/models/user";
import { Response } from "../../app/containers/models/response";

@Injectable()
export class AuthService {

	// is used notify subscribers when user is trying to log in
	auth$: Observable<Response>;

	private domain = 'http://localhost:7777';
	private options: RequestOptions;

	constructor(private http: Http, private store: Store) {
		this.auth$ = new Observable<Response>();

		this.options = new RequestOptions({
			headers: new Headers({
				'content-type': 'application/json'
			})
		})
	}

	/**
	 *
	 * @param user
	 */
	login(user: User): Observable<any> {
		let url = `${this.domain}/api/v1/user/login`;
		return this.auth$ = this.http.post(url, user, this.options)
			.map(res => res.json())
			// now we have the Response (user)
			.do((next: Response) /*user*/ => {
				// if no success
				if (!next.success) {
					// user is not logged in
					this.store.set('user', null);
					return;
				}
				const user: Member = {
					id: next.token,
					email: next.user.email,
					isAuthenticated: true
				};
				this.store.set('user', user);
			})
	}

	register(user: User): Observable<any> {
		let url = `${this.domain}/api/v1/user/register`;
		return this.http.post(url, user, this.options).map(res => res.json());
	}

	setTokenInLocalStorage(res: Response) {
		localStorage.setItem('token', res.token);
	}

	isLoggedIn(): boolean {
		return tokenNotExpired();
	}

	logout() {
		localStorage.clear();
	}

}