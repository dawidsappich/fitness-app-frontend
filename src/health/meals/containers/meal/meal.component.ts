import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meal } from "../../../../app/containers/models/meal";
import { Router, ActivatedRoute } from "@angular/router";

import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';


import { MealsService } from "../../../shared/services/meals/meals.service";
import { AuthService } from "../../../../auth/service/auth.service";


@Component({
	selector: 'meal',
	styleUrls: ['meal.component.scss'],
	templateUrl: 'meal.component.html'
})
export class MealComponent implements OnInit, OnDestroy {

	userEmail: string;
	subscription: Subscription;
	meal$: Observable<Meal>;


	constructor(
		private mealService: MealsService,
		private authService: AuthService,
		private router: Router,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.meal$ = this.route.params
			.switchMap(param => this.mealService.getMeal(param.id))
	}

	ngOnDestroy() { }

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

	updateMeal(meal: Meal) {
		const id = this.route.snapshot.params.id
		this.mealService.updateMeal(id, meal).subscribe();
		this.backToMeals();
	}

	removeMeal(event: Meal) {
		console.log('REMOVE', event)
		// TODO: Call MealsService to remove meal form DB
	}
}