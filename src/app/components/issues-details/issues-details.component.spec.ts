import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesDetailsComponent } from './issues-details.component';

describe('IssuesDetailsComponent', () => {
  let component: IssuesDetailsComponent;
  let fixture: ComponentFixture<IssuesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssuesDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
