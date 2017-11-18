import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'list-item',
	styleUrls: ['list-item.component.scss'],
	templateUrl: 'list-item.component.html'
})
export class ListItemComponent {

	isToggled = false;

	@Input()
	item: any;

	@Output()
	remove = new EventEmitter<any>();

	constructor() { }

	getItemRoute(item: any) {
		return [`../${this.item.ingredients ? 'meals' : 'workouts'}`, item._id];
	}

	removeItem() {
		this.remove.emit(this.item);
	}

	toggle() {
		this.isToggled = !this.isToggled;
	}

}