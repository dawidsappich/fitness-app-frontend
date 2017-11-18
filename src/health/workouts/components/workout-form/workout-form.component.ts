import { Component, ChangeDetectionStrategy, OnChanges, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, FormArray, FormControl, Validators } from "@angular/forms";

import { Workout } from "../../../../app/containers/models/workout";

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'workout-form',
	styleUrls: ['workout-form.component.scss'],
	templateUrl: 'workout-form.component.html'
})
export class WorkoutFormComponent implements OnChanges {

	@Output()
	create = new EventEmitter<Workout>();
	@Output()
	update = new EventEmitter<Workout>();
	@Output()
	remove = new EventEmitter<Workout>();

	@Input()
	workout: any;

	form: FormGroup = this.fb.group({
		name: ['', Validators.required],
		type: 'strength',
		strength: this.fb.group({
			reps: 0,
			sets: 0,
			weight: 0
		}),
		endurance: this.fb.group({
			distance: 0,
			duration: 0
		}),
	})

	isToggled = false;
	exists = false;

	constructor(
		private fb: FormBuilder
	) { }

	get placeholder() {
		return `e.g. ${this.form.get('type').value === 'strength' ? 'Benchpress' : 'Running'}`;
	}

	ngOnChanges(changes: SimpleChanges) {

		if (this.workout.message && this.workout.message.name) {
			this.exists = true;
			if (changes.workout.currentValue.message.type === 'strength') {
				this.form.patchValue({
					name: changes.workout.currentValue.message.name,
					type: changes.workout.currentValue.message.type,
					strength: {
						reps: changes.workout.currentValue.message.strength.reps,
						sets: changes.workout.currentValue.message.strength.sets,
						weight: changes.workout.currentValue.message.strength.weight
					}
				});
			}
			if (changes.workout.currentValue.message.type === 'endurance') {
				this.form.patchValue({
					name: changes.workout.currentValue.message.name,
					type: changes.workout.currentValue.message.type,
					endurance: {
						distance: changes.workout.currentValue.message.endurance.distance,
						duration: changes.workout.currentValue.message.endurance.duration
					}
				});
			}

		}
	}

	createWorkout() {
		if (this.form.valid) {
			this.create.emit(this.form.value)
		}
	}

	removeWorkout() {
		this.remove.emit(this.form.value)
	}

	updateWorkout() {
		console.log(this.form.valid)
		if (this.form.valid) {
			this.update.emit(this.form.value)
		}
	}

	get required() {
		return (
			this.form.get('name').hasError('required') &&
			this.form.get('name').touched
		)
	}

	toggle() {
		this.isToggled = !this.isToggled;
	}
}