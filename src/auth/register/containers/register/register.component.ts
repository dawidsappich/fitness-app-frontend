import { Component } from '@angular/core';
import { FormGroup } from "@angular/forms";
// service
import { AuthService } from "../../../service/auth.service";

@Component({
	selector: 'register',
	templateUrl: 'register.component.html'
})
export class RegisterComponent {
	constructor(private authService: AuthService) { }

	registerUser(event: FormGroup) {

		this.authService.register(event.value)
			.subscribe(res => {

			})

	}
}