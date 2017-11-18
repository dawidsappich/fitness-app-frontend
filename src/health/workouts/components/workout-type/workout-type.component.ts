import { Component, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export const TYPE_CONTORL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => WorkoutTypeComponent),
	multi: true
}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TYPE_CONTORL_ACCESSOR],
	selector: 'workout-type',
	styleUrls: ['workout-type.component.scss'],
	templateUrl: 'workout-type.component.html'
})
export class WorkoutTypeComponent implements ControlValueAccessor {

	selectors = ['strength', 'endurance'];
	value: string;

	private onTouch: Function;
	private onModelChange: Function;

	constructor() { }

	// will be provided by parent workout-form component
	writeValue(value: string): void {
		this.value = value;
	}
	// ControlValueAccessor provides the function as Parameter
	registerOnChange(fn: Function): void {
		this.onModelChange = fn;
	}
	// ControlValueAccessor provides the function as Parameter
	registerOnTouched(fn: Function): void {
		this.onTouch = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		throw new Error("Method not implemented.");
	}

	setSelected(value: string) {
		this.value = value;
		// tell changeDetection to execute an tell the new value
		this.onModelChange(value);
		// user has interacted with the form
		this.onTouch();
	}

}