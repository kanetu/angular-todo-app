import { Injectable } from '@angular/core';
import { API, baseAPI } from './apis';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IGetTodosRequest } from '../models/requests/IGetTodosRequest';
import { IGetTodosResponse } from '../models/responses/IGetTodosResponse';
import { ICompleteTodoResponse } from '../models/responses/ICompleteTodoResponse';
import { ICompleteTodoRequest } from '../models/requests/ICompleteTodoRequest';
import { IUpdateTodoRequest } from '../models/requests/IUpdateTodoRequest';
import { IUpdateTodoResponse } from '../models/responses/IUpdateTodoResponse';
import { IDeleteTodoRequest } from '../models/requests/IDeleteTodoRequest';
import { ICreateTodoResponse } from '../models/responses/ICreateTodoResponse';
import { ICreateTodoRequest } from '../models/requests/ICreateTodoRequest';

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

  createTodo({ todo }: ICreateTodoRequest): Observable<ICreateTodoResponse> {
    return this.http.post<ICreateTodoResponse>(baseAPI + API.createTodo, todo);
  }

  completeTodo({
    todoId,
    completed,
  }: ICompleteTodoRequest): Observable<ICompleteTodoResponse> {
    return this.http.patch<ICompleteTodoResponse>(
      baseAPI + API.updateTodo.replace('{todoId}', todoId),
      { completed }
    );
  }

  updateTodo({
    todoId,
    title,
  }: IUpdateTodoRequest): Observable<IUpdateTodoResponse> {
    return this.http.patch<IUpdateTodoResponse>(
      baseAPI + API.updateTodo.replace('{todoId}', todoId),
      { title }
    );
  }

  deleteTodo({ todoId }: IDeleteTodoRequest): Observable<never> {
    return this.http.delete<never>(
      baseAPI + API.deleteTodo.replace('{todoId}', todoId)
    );
  }
}
