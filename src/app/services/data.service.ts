import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, TaskItem, TaskItemDto, TaskStatus } from '../interface/itask-item';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl="http://localhost:5166/api";
  constructor(private http:HttpClient) { }
  // Get all task items
  getAllTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(`${this.baseUrl}/TaskItems`);
  }

  // Get a task by id
  getTaskById(id: number): Observable<TaskItem> {
    return this.http.get<TaskItem>(`${this.baseUrl}/TaskItems/${id}`);
  }

  // Create a new task
  createTask(task: TaskItemDto): Observable<string> {
    return this.http.post('http://localhost:5166/api/TaskItems', task, {
      responseType: 'text'
    });
  }



  // Delete a task
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/TaskItems/${id}`);
  }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/Categories`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/Categories/${id}`);
  }
  getAllStatuses(): Observable<TaskStatus[]> {
    return this.http.get<TaskStatus[]>(`${this.baseUrl}/Taskstatus`);
  }

  getStatusById(id: number): Observable<TaskStatus> {
    return this.http.get<TaskStatus>(`${this.baseUrl}/Taskstatus/${id}`);
  }




}
