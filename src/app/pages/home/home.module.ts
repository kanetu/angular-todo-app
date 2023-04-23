import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent, TodoListComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
