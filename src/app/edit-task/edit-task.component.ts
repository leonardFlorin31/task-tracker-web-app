import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { Task } from '../task';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Status } from '../status-enum';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent {
  statuses: Status[] = [];
  
  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.statuses = Object.values(Status);
  }

  save(): void {
    this.taskService.editTask(this.task).subscribe((response) =>{
      this.dialogRef.close();
    })
  }

  cancel(): void {
    this.dialogRef.close();
  }
}