import { Component, OnInit, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
	selector: 'meal-form',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['meal-form.component.scss'],
	templateUrl: 'meal-form.component.html'
})
export class MealFormComponent implements OnInit {

	form: FormGroup

	constructor(
		private fb: FormBuilder
	) { }

	createMeal() {
		console.log(this.form.value)
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

	addIngredient() {
		this.ingredients.push(new FormControl(''));
	}

	removeIngredient(index: number) {
		this.ingredients.removeAt(index);
	}
}