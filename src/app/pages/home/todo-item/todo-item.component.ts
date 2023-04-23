import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Todo } from 'src/app/shared/models/todo.module';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.sass'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo | undefined;
  @Output() onCheckTodo = new EventEmitter();
  @Output() onEditTodo = new EventEmitter();
  @Output() onDeleteTodo = new EventEmitter();

  isEdit = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.editForm.patchValue({ title: this.todo?.title });
  }

  editForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(250)]],
  });

  handleCompleteCheck(): void {
    this.onCheckTodo.emit({
      ...this.todo,
      completed: !this.todo?.completed,
    });
  }

  handleEditTodo(): void {
    debugger;

    if (this.editForm.value.title) {
      this.onEditTodo.emit({ ...this.todo, title: this.editForm.value.title });
    }
    // this.toggleEditMode();
  }

  handleDeleteTodo(): void {
    this.onDeleteTodo.emit(this.todo);
  }

  toggleEditMode(): void {
    this.isEdit = !this.isEdit;
  }
}
