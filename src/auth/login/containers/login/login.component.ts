import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { Router } from "@angular/router";

import { Subscription } from "rxjs/Subscription";

// service
import { AuthService } from "../../../service/auth.service";
// interface
import { Response } from "../../../../app/containers/models/response";

@Component({
	selector: 'login',
	templateUrl: 'login.component.html'
})
export class LoginComponent implements OnDestroy {

	error: string;
	isLoggedIn: Subscription;

	constructor(private authService: AuthService, private router: Router) { }

	// unsubscribe when destroyed
	ngOnDestroy() {
		this.isLoggedIn.unsubscribe();
	}

	loginUser(event: FormGroup) {

		this.isLoggedIn = this.authService.login(event.value)
			.subscribe((res: Response) => {

				if (!res.success) {
					this.error = res.message;
				}

				if (res.success) {
					this.error = null;
					this.authService.setTokenInLocalStorage(res);
					// navigate to home
					this.router.navigate(['/']);
				}

			})

	}
}