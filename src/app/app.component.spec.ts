import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockTodoListComponent } from './testing/mockComponents/TodoList-mock.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockTodoListComponent
      ],
      providers: [

      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
