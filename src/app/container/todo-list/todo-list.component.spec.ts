import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TodoItemComponent } from 'src/app/components/todo-item/todo-item.component';
import { TodoService } from 'src/app/service/todo.service';
import { mockTodoService } from 'src/app/testing/mock/todo';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent, TodoItemComponent ],
      providers: [{
        provide: TodoService,
        useValue: mockTodoService
      }],
      imports: [FontAwesomeModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
