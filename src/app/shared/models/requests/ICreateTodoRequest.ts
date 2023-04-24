import { Todo } from '../todo.module';

export interface ICreateTodoRequest {
  todo: Omit<Todo, 'id'>;
}
