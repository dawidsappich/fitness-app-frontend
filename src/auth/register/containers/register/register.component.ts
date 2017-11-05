import { Component } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
// service
import { AuthService } from "../../../service/auth.service";
// interface
import { Response } from "../../../../app/containers/models/response";

@Component({
	selector: 'register',
	templateUrl: 'register.component.html'
})
export class RegisterComponent {

	error: string;

	constructor(private authService: AuthService, private router: Router) { }

	registerUser(event: FormGroup) {

		this.authService.register(event.value)
			.subscribe((res: Response) => {

				if (!res.success) {
					this.error = res.message;
				}

				if (res.success) {
					this.error = null;
					this.router.navigate(['auth/login']);
				}

			})

	}
}