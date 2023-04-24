import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [HomeComponent, TodoListComponent, TodoItemComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    NzIconModule,
    NzModalModule,
    NzCheckboxModule,
  ],
})
export class HomeModule {}
