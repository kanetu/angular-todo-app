import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { USER_INFO } from 'src/app/constants';
import { IGetTodosResponse } from 'src/app/shared/models/responses/IGetTodosResponse';
import { Todo } from 'src/app/shared/models/todo.module';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  todos: IGetTodosResponse[] = [];
  userInfo = JSON.parse(localStorage.getItem(USER_INFO) || '[]');

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) {}

  todoForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(250)]],
  });

  get f() {
    return this.todoForm.controls;
  }

  ngOnInit(): void {
    if (this.userInfo.length > 0) {
      this.todoService
        .getTodos({ userId: this.userInfo[0].id })
        .pipe(
          takeUntil(this.destroy$),
          tap((data) => {
            this.todos = data;
          })
        )
        .subscribe();
    }
  }

  createTodo(): void {
    if (this.userInfo.length > 0 && this.todoForm.value.title) {
      const todo = {
        userId: this.userInfo.id,
        completed: false,
        title: this.todoForm.value.title,
      };
      this.todoService
        .createTodo({ todo })
        .pipe(
          takeUntil(this.destroy$),
          tap((response) => {
            this.todos = [response, ...this.todos];
          })
        )
        .subscribe();
      this.todoForm.reset();
    }
  }

  completeTodo(data: Todo): void {
    this.todoService
      .completeTodo({ todoId: data.id, completed: data.completed })
      .pipe(
        takeUntil(this.destroy$),
        tap((response) => {
          const newTodos = this.todos.map((item) => {
            return item.id === response.id
              ? { ...item, completed: response.completed }
              : item;
          });

          this.todos = newTodos;
        })
      )
      .subscribe();
  }

  deleteTodo(data: Todo): void {
    this.todoService
      .deleteTodo({ todoId: data.id })
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.todos = this.todos.filter((item) => item.id !== data.id);
        })
      )
      .subscribe();
  }

  editTodo(data: Todo): void {
    this.todoService
      .updateTodo({ todoId: data.id, title: data.title })
      .pipe(
        takeUntil(this.destroy$),
        tap((response) => {
          const newTodos = this.todos.map((item) => {
            return item.id === response.id
              ? { ...item, title: response.title }
              : item;
          });

          this.todos = newTodos;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
