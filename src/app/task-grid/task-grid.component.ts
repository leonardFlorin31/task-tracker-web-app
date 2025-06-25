import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Task } from '../task';
import { CommonModule, NgFor } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-grid',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, NgFor, TaskCardComponent],
  providers: [TaskService],
  templateUrl: './task-grid.component.html',
  styleUrl: './task-grid.component.scss'
})
export class TaskGridComponent {
  
  tasks: Task[];

  constructor(
    private taskService: TaskService,
  ) {}

  onDeleteClicked(task) {
    this.taskService.deleteTask(task)
      .subscribe(task => {
        console.log('Task deleted successfully:', task);

      });
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }
}
