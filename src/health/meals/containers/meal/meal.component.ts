import { Component } from '@angular/core';
import { Meal } from "../../../../app/containers/models/meal";
import { Router } from "@angular/router";

import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/switchMap';


import { MealsService } from "../../../shared/services/meals/meals.service";
import { AuthService } from "../../../../auth/service/auth.service";

@Component({
	selector: 'meal',
	styleUrls: ['meal.component.scss'],
	templateUrl: 'meal.component.html'
})
export class MealComponent {

	userEmail: string;
	subscription: Subscription;


	constructor(
		private mealService: MealsService,
		private authService: AuthService,
		private router: Router
	) { }


	addnewMeal(meal: Meal) {
		this.subscription = this.authService.getUser()
			.switchMap(user => {
				let email = user.email;
				const mealObj = { ...meal, email };
				return this.mealService.addNewMeal(mealObj)
			})
			.subscribe()
		this.backToMeals();
	}

	backToMeals() {
		this.router.navigate(['meals']);
	}
}