export const todoServiceSpy = jasmine.createSpyObj('TodoService', [
  'requestTodos',
  'getTodos',
  'deleteTodo',
  'toggleCheck',
  'copy'
])
