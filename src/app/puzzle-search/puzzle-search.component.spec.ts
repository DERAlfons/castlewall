import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleSearchComponent } from './puzzle-search.component';

describe('PuzzleSearchComponent', () => {
  let component: PuzzleSearchComponent;
  let fixture: ComponentFixture<PuzzleSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
