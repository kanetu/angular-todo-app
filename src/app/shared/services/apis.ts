export const baseAPI = 'https://jsonplaceholder.typicode.com';

export const API = {
  login: '/users',
  todos: '/users/{userId}/todos',
  createTodo: '/todos',
  updateTodo: '/todos/{todoId}',
  deleteTodo: '/todos/{todoId}',
};
