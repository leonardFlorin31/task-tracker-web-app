import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { TasksViewComponent } from './tasks-view/tasks-view.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, TasksViewComponent, RouterLink, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-tracker';

  constructor(private notificationService: NotificationService) {
    this.notificationService.initWebSocket(); // in ngOnInit
  }
}

