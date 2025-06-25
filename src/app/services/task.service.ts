import { Injectable } from '@angular/core';
import { Task } from '../task';
import { Status } from '../status-enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseURL="http://localhost:5043/Task"

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private httpClient : HttpClient) { }

  getTasks() {
    return this.httpClient.get<Task[]>(this.baseURL);
  }

  addTask(newTask: Task) {
    return this.httpClient.post<Task>(this.baseURL, newTask, { headers: this.httpOptions.headers, responseType: 'text' as 'json' });
  }


  editTask(task: Task) {
    return this.httpClient.put<any>(`${this.baseURL}/${task.id}`, task, { headers: this.httpOptions.headers, responseType: 'text' as 'json' });
  }
    

  deleteTask(task: Task) {
    return this.httpClient.delete<void>(`${this.baseURL}/${task.id}`,{ headers: this.httpOptions.headers, responseType: 'text' as 'json' });
  }
    
    
}
