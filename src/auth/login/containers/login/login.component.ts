import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { Router } from "@angular/router";

// service
import { AuthService } from "../../../service/auth.service";
// interface
import { Response } from "../../../../app/containers/models/response";

@Component({
	selector: 'login',
	templateUrl: 'login.component.html'
})
export class LoginComponent {

	error: string;

	constructor(private authService: AuthService, private router: Router) { }

	loginUser(event: FormGroup) {

		this.authService.login(event.value)
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