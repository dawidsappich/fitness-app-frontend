import { Component, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

import { Meal } from "../../../../app/containers/models/meal";

@Component({
	selector: 'meal-form',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['meal-form.component.scss'],
	templateUrl: 'meal-form.component.html'
})
export class MealFormComponent implements OnChanges {

	@Output()
	create = new EventEmitter<Meal>();
	@Output()
	update = new EventEmitter<Meal>();
	@Output()
	remove = new EventEmitter<Meal>();

	@Input()
	meal: any;

	form: FormGroup = this.fb.group({
		name: ['', Validators.required],
		ingredients: this.fb.array([''])
	})

	isToggled = false;
	exists = false;

	constructor(
		private fb: FormBuilder
	) { }

	ngOnChanges(changes: SimpleChanges) {

		if (this.meal.message && this.meal.message.name) {
			this.exists = true;
			this.emptyIngredients();

			const value = this.meal;

			this.form.patchValue({
				name: changes.meal.currentValue.message.name,
				ingredients: changes.meal.currentValue.message.ingredients
			});

			// populate the FormArray with the new values
			if (value.message.ingredients) {
				for (const item of value.message.ingredients) {
					this.ingredients.push(new FormControl(item));
				}
			}

		}
	}

	emptyIngredients() {
		while (this.ingredients.controls.length) {
			this.ingredients.removeAt(0);
		}
	}


	createMeal() {
		if (this.form.valid) {
			this.create.emit(this.form.value)
		}
	}

	removeMeal() {
		this.remove.emit(this.form.value)
	}

	updateMeal() {
		if (this.form.valid) {
			this.update.emit(this.form.value)
		}
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

	toggle() {
		this.isToggled = !this.isToggled;
	}


}