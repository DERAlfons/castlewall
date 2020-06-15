import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTestComponent } from './board-test.component';

describe('BoardTestComponent', () => {
  let component: BoardTestComponent;
  let fixture: ComponentFixture<BoardTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
