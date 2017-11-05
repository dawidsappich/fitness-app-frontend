import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

// rxjs
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
// JSON Web Token
import { tokenNotExpired } from 'angular2-jwt';
// Inteface
import { User } from "../../app/containers/models/user";
import { Response } from "../../app/containers/models/response";

@Injectable()
export class AuthService {

	private domain = 'http://localhost:7777';
	private user: string;
	private authToken: string;
	private options: RequestOptions;

	constructor(private http: Http) {
		this.options = new RequestOptions({
			headers: new Headers({
				'content-type': 'application/json'
			})
		})
	}

	login(user: User): Observable<any> {
		let url = `${this.domain}/api/v1/user/login`;
		return this.http.post(url, user, this.options).map(res => res.json())
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