import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Task } from '../task';
import { CommonModule, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, NgFor, MatIconModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Output() deleteClicked = new EventEmitter<Task>();
  @Input() task: Task;
  
  constructor(
    private dialog: MatDialog,
    private taskService: TaskService
  ) {}

  deleteTask(task: Task) {
    this.deleteClicked.emit(task);
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: task,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
 
}
