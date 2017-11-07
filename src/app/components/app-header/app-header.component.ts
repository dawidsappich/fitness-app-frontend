import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Member } from "../../../app/containers/models/user";

@Component({
	selector: 'app-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['app-header.component.scss'],
	templateUrl: 'app-header.component.html'
})
export class AppHeaderComponent {

	@Input()
	user: Member;

	@Output()
	logout = new EventEmitter<any>();

	logoutUser() {
		this.logout.emit();
	}

}