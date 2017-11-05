import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms'

// service
import { AuthService } from "../../../service/auth.service";
// interface
import { Response } from "../../../../app/containers/models/response";

@Component({
	selector: 'login',
	templateUrl: 'login.component.html'
})
export class LoginComponent {

	constructor(private authService: AuthService) { }

	loginUser(event: FormGroup) {

		this.authService.login(event.value)
			.subscribe((res: Response) => {

				if (res.success) {
					this.authService.setTokenInLocalStorage(res);
				}

			})

	}
}