import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { USER_INFO } from 'src/app/constants';
import { IGetTodosResponse } from 'src/app/shared/models/responses/IGetTodosResponse';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  todos$ = new Subject<IGetTodosResponse[]>();

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) {}

  todoForm = this.formBuilder.group({
    todo: [''],
  });

  ngOnInit(): void {
    const userInfo = JSON.parse(localStorage.getItem(USER_INFO) || '[]');
    if (userInfo.length > 0) {
      this.todoService
        .getTodos({ userId: userInfo[0].id })
        .pipe(
          takeUntil(this.destroy$),
          tap((data) => {
            this.todos$.next(data);
          })
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
