import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

import { Meal } from "../../../../app/containers/models/meal";

@Component({
	selector: 'meal-form',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['meal-form.component.scss'],
	templateUrl: 'meal-form.component.html'
})
export class MealFormComponent implements OnInit {

	@Output()
	create = new EventEmitter<Meal>();

	form: FormGroup

	constructor(
		private fb: FormBuilder
	) { }

	createMeal() {
		if (this.form.valid) {
			this.create.emit(this.form.value)
		}
	}

	ngOnInit() {
		this.form = this.fb.group({
			name: ['', Validators.required],
			ingredients: this.fb.array([''])
		})
	}

	get ingredients() {
		return this.form.get('ingredients') as FormArray
	}

	get required() {
		return (
			this.form.get('name').hasError('required') &&
			this.form.get('name').touched
		)
	}

	addIngredient() {
		this.ingredients.push(new FormControl(''));
	}

	removeIngredient(index: number) {
		this.ingredients.removeAt(index);
	}
}