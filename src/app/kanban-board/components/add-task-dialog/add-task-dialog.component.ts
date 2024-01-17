import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { KanbanStatusList } from '@core/enumerations';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss',
})
export class AddTaskDialogComponent {
  public kanbanStatus = Object.values(KanbanStatusList);

  subTaskForm = this._fb.group({
    status: new FormControl(false, [Validators.required]),
    title: new FormControl('', [Validators.required]),
  });

  form = this._fb.group({
    id: new FormControl(Date.now()),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    subtask: this.formBuilder.array([this.subTaskForm]),
    status: new FormControl('', [Validators.required]),
  });

  constructor(
    private _dialogRef: MatDialogRef<AddTaskDialogComponent>,
    private formBuilder: FormBuilder,
    private _fb: FormBuilder
  ) {}

  public onConfirm(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      const task = this.form.value;
      this._dialogRef.close({ task });
    }
  }

  get subtasks() {
    return this.form?.get('subtask') as FormArray;
  }

  addNewTask() {
    const newTaskForm = this._fb.group({
      status: new FormControl(false, [Validators.required]),
      title: new FormControl('', [Validators.required]),
    });
    this.subtasks.push(newTaskForm);
  }

  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }
}
