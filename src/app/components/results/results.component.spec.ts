import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { ResultsComponent } from './results.component';
import {
  MatBadgeModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatTabsModule,
  MatTooltipModule,
} from '@angular/material';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { RepositoryDetailsComponent } from '../repository-details/repository-details.component';
import { IssuesDetailsComponent } from '../issues-details/issues-details.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { PieChartComponent } from '../../shared/components/pie-chart/pie-chart.component';
import { RepositoriesService } from '../../shared/services/repositories.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RepositoriesAdapter } from '../../shared/services/repositories.model';
import { of } from 'rxjs';
import { mockRepositories } from '../../shared/mocks/mock-repositories';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResultsComponent,
        ProgressBarComponent,
        RepositoryDetailsComponent,
        IssuesDetailsComponent,
        StatisticsComponent,
        PieChartComponent,
      ],
      imports: [
        MatProgressBarModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatCardModule,
        MatBadgeModule,
        MatIconModule,
        MatTooltipModule,
        MatListModule,
        MatGridListModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [RepositoriesService, RepositoriesAdapter],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load repositories data onInit', async(
    inject([RepositoriesService], repositoriesService => {
      const mockSearchValue = 'mockValue';
      spyOn(component, 'getRepositoriesData').and.callThrough();
      spyOn(repositoriesService, 'items').and.returnValue(of(mockRepositories));
      expect(component.repositoriesContent).toBeUndefined();
      repositoriesService.searchValue.next(mockSearchValue);
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.getRepositoriesData).toHaveBeenCalledWith(mockSearchValue);
      expect(component.repositoriesContent).toBeDefined();
    })
  ));
});
