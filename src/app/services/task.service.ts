import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl: string = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(task: Task): Observable<Task> {
    const url: string = this.apiUrl + '/' + task.id;
    return this.http.delete(url);
  }

  updateTask(task: Task): Observable<Task> {
    const url: string = this.apiUrl + '/' + task.id;
    return this.http.put(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post(this.apiUrl, task, httpOptions);
  }
}
