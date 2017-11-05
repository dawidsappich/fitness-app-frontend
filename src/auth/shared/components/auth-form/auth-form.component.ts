import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
	selector: 'auth-form',
	styleUrls: ['auth-form.component.scss'],
	templateUrl: 'auth-form.component.html'
})
export class AuthFormComponent implements OnInit {

	// emit the hole form to access the form in ancestor
	@Output()
	submitted = new EventEmitter<FormGroup>();

	form: FormGroup;

	constructor(private fb: FormBuilder) { }

	ngOnInit() {
		this.form = this.fb.group({

			email: ['', Validators.email],
			password: ['', Validators.required]

		})
	}

	onSubmit() {
		if (this.form.valid) {
			// emit event to decendants
			this.submitted.emit(this.form);
		}
	}

	// return a booelan value if the password is set and is touched
	get passwordInvalid() {
		const control = this.form.get('password');
		return control.hasError('required') && control.touched;
	}

	get emailFormat() {
		const control = this.form.get('email');
		return control.hasError('email') && control.touched;
	}

}