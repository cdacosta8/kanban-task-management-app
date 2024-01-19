import { Component, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KanbanStatusList } from '@core/enumerations';
import { IkanbanTask } from '@core/interfaces';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.scss',
})
export class EditTaskDialogComponent {
  public kanbanStatus = Object.values(KanbanStatusList);

  form = this._fb.group({
    id: new FormControl(Date.now()),
    title: new FormControl(''),
    description: new FormControl(''),
    subtask: this._fb.array([]),
    status: new FormControl('', [Validators.required]),
  });

  constructor(
    private _dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: { taskToEdit: IkanbanTask },
    private _fb: FormBuilder
  ) {
    this._initializeForm();
  }

  public onConfirm(): void {
    if (this.form.valid) {
      const task = this.form.value;
      this._dialogRef.close({ task });
    }
  }

  get tasks() {
    return this.form.value;
  }

  get subtasks() {
    return this.form?.get('subtask') as FormArray;
  }

  private _initializeForm() {
    const itemsFormArray = this.form.get('subtask') as FormArray;
    this._data.taskToEdit.subtask.forEach((item) => {
      itemsFormArray.push(
        this._fb.group({
          status: new FormControl(item.status, [Validators.required]),
          title: new FormControl(item.title, [Validators.required]),
        })
      );
    });
    this.form.patchValue(this._data.taskToEdit);
  }
}
