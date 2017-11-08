import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { MealsService } from "../../../shared/services/meals/meals.service";
import { AuthService } from "../../../../auth/service/auth.service";

import { Meal } from "../../../../app/containers/models/meal";
import { Member } from "../../../../app/containers/models/user";

@Component({
	selector: 'meals',
	styleUrls: ['meals.component.scss'],
	templateUrl: 'meals.component.html'
})
export class MealsComponent implements OnInit, OnDestroy {

	subscription: Subscription;
	meals: Meal[];
	user: string;

	constructor(
		private mealsService: MealsService,
		private authService: AuthService
	) { }

	ngOnInit() {
		// get the actual user from the store to get a list of meals from the database
		this.authService.getUser().subscribe((user: Member) => this.user = user.email);
		this.subscription
			= this.mealsService.getmeals(this.user)
			.subscribe(res => {
					this.meals = res.message.map((meal: Meal) => {
						return meal.name;
					})
				})
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}