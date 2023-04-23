import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo.module';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.sass'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo | undefined;
  constructor() {}

  ngOnInit(): void {}
}
