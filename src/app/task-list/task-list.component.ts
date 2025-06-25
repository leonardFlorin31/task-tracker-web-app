import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { Status } from '../status-enum';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatFabButton, MatMiniFabButton } from '@angular/material/button';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FilterComponent, MatIconModule, MatButtonModule],
  providers: [TaskService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit{

  tasks: Task[];
  filteredTasks: Task[];
  currentStatus: Status;

  constructor(
    private taskService: TaskService, private dialog: MatDialog
  ) {}
  
  deleteTask(task: Task) {
    this.taskService.deleteTask(task)
      .subscribe(() => {
        console.log('Task deleted successfully:', task.id);
       // this.filteredTasks = this.filteredTasks.filter(x=>x.id != task.id)
        this.taskService
        .getTasks()
        .subscribe((tasks) => {
          this.tasks = tasks;
          this.handleStatusSelected(this.currentStatus);
        });
      });
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: task,
    });
 
     dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
   }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.filteredTasks = tasks;
      this.tasks = tasks
    });
   
  }

  handleStatusSelected(status): void {
    this.currentStatus = status;
    this.filteredTasks = this.tasks.filter((task) => task.status == status)
  }
}
