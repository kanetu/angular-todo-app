import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
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
  confirmModal?: NzModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private modal: NzModalService
  ) {}

  get f() {
    return this.editForm.controls;
  }

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
    if (this.editForm.value.title) {
      this.onEditTodo.emit({ ...this.todo, title: this.editForm.value.title });
    }
    this.toggleEditMode();
  }

  handleDeleteTodo(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you want to delete this todo?',
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOnOk: () => {
        this.onDeleteTodo.emit(this.todo);
      },
    });
  }

  toggleEditMode(): void {
    this.isEdit = !this.isEdit;
  }
}
