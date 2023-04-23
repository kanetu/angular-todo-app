import { Injectable } from '@angular/core';
import { API, baseAPI } from './apis';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IGetTodosRequest } from '../models/requests/IGetTodosRequest';
import { IGetTodosResponse } from '../models/responses/IGetTodosResponse';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos({ userId }: IGetTodosRequest): Observable<IGetTodosResponse[]> {
    return this.http.get<IGetTodosResponse[]>(
      baseAPI + API.todos.replace('{userId}', userId)
    );
  }
}
