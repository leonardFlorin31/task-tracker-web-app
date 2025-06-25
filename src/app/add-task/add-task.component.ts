import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../task';
import { Status } from '../status-enum';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, RouterModule],
  providers: [TaskService],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  title: string;
  taskDescription: string;
  assignedTo: string;
  status: string;
  
  constructor(private router: Router, private taskService: TaskService, private notificationService: NotificationService) {}

  onCancel() {
    this.router.navigate(['/']);
    console.log('cancel');
  }

  onSubmit() {
    const newTask = <Task>{
      title: this.title,
      description: this.taskDescription,
      assignedTo: this.assignedTo,
      status: this.status
    }
  
    this.taskService.addTask(newTask).subscribe(() => {
      this.notificationService.sendMessage('BroadcastMessage', [newTask]);
      this.router.navigate(['/']);
    });

  }
}
