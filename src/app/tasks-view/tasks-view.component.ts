import { Component } from '@angular/core';
import { TaskGridComponent } from '../task-grid/task-grid.component';
import { Task } from '../task';
import { Status } from '../status-enum';
import { TaskListComponent } from '../task-list/task-list.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-tasks-view',
  standalone: true,
  imports: [TaskGridComponent, TaskListComponent, CommonModule, MatIconModule],
  templateUrl: './tasks-view.component.html',
  styleUrl: './tasks-view.component.scss'
})
export class TasksViewComponent {
  taskList: Task[];
  isList: boolean = true;
  notificationMessage: string;

  constructor(private notificationService: NotificationService){

  }

  ngOnInit() {
    this.notificationService.notificationSubject.subscribe(
      (hasNotifications) =>
        (this.notificationMessage = hasNotifications
          ? 'New notifications, please refresh the page'
          : '')
    );
  }
}
