import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

import { MealsService } from "../../../shared/services/meals/meals.service";
import { AuthService } from "../../../../auth/service/auth.service";

import { Meal } from "../../../../app/containers/models/meal";
import { Member } from "../../../../app/containers/models/user";

@Component({
	selector: 'meals',
	styleUrls: ['meals.component.scss'],
	templateUrl: 'meals.component.html'
})
export class MealsComponent implements OnInit {

	meals$: Observable<Meal>;
	user: string;

	constructor(
		private mealsService: MealsService,
		private authService: AuthService
	) { }

	ngOnInit() {
		// get the actual user from the store to get a list of meals from the database
		this.authService.getUser().subscribe((user: Member) => this.user = user.email);
		this.meals$ = this.mealsService.getmeals(this.user);
	}

	removeMeal(meal: any) {
		this.mealsService.removeMeal(meal._id)
			.subscribe(() => { this.meals$ = this.mealsService.getmeals(this.user) })
	}
}