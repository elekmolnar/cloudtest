import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { IssuesDetailsComponent } from './issues-details.component';
import { MatBadgeModule, MatIconModule, MatListModule } from '@angular/material';
import { IssuesService } from '../../shared/services/issues.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IssuesAdapter } from '../../shared/services/issues.model';
import { mockIssuesResponse } from '../../shared/mocks/mock-issues';
import { SimpleChanges } from '@angular/core';
import { of } from 'rxjs';

describe('IssuesDetailsComponent', () => {
  let component: IssuesDetailsComponent;
  let fixture: ComponentFixture<IssuesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssuesDetailsComponent],
      imports: [MatIconModule, MatListModule, HttpClientTestingModule, MatBadgeModule],
      providers: [IssuesService, IssuesAdapter],
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

  it('should load issues when no content or different id', async(
    inject([IssuesService], issueService => {
      spyOn(component, 'getIssues').and.callThrough();
      spyOn(issueService, 'issues').and.returnValue(of(mockIssuesResponse));
      component.id = 1;
      const changes: SimpleChanges = {
        id: {
          previousValue: undefined,
          currentValue: 2,
          firstChange: true,
          isFirstChange(): boolean {
            return true;
          },
        },
      };
      expect(component.issuesContent).toBeUndefined();
      component.ngOnChanges(changes);
      expect(component.getIssues).toHaveBeenCalled();
      expect(issueService.issues).toHaveBeenCalled();
      expect(component.issuesContent).toBeDefined();
      expect(component.issuesContent.total_count).toBe(6);
    })
  ));

  it('should not load issues when is the same id and has content', async(
    inject([IssuesService], issueService => {
      spyOn(component, 'getIssues').and.callThrough();
      spyOn(issueService, 'issues').and.returnValue(of(mockIssuesResponse));
      component.id = 1;
      component.previousId = 1;
      fixture.detectChanges();
      const changes: SimpleChanges = {
        previousIssues: {
          previousValue: undefined,
          currentValue: mockIssuesResponse,
          firstChange: true,
          isFirstChange(): boolean {
            return true;
          },
        },
        id: {
          previousValue: undefined,
          currentValue: 1,
          firstChange: true,
          isFirstChange(): boolean {
            return true;
          },
        },
      };
      expect(component.issuesContent).toBeUndefined();
      component.ngOnChanges(changes);
      expect(component.getIssues).not.toHaveBeenCalled();
      expect(issueService.issues).not.toHaveBeenCalled();
      expect(component.issuesContent).toBeDefined();
      expect(component.issuesContent.total_count).toBe(6);
    })
  ));
});
