import { Component } from '@angular/core';
import { Meal } from "../../../../app/containers/models/meal";

@Component({
	selector: 'meal',
	styleUrls: ['meal.component.scss'],
	templateUrl: 'meal.component.html'
})
export class MealComponent {



	constructor() { }

	addnewMeal(event: Meal) {
		console.log(event)
	}
}