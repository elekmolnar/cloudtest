import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ResultsComponent } from './components/results/results.component';
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
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { RepositoryDetailsComponent } from './components/repository-details/repository-details.component';
import { IssuesDetailsComponent } from './components/issues-details/issues-details.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PieChartComponent } from './shared/components/pie-chart/pie-chart.component';
import { RepositoriesService } from './shared/services/repositories.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RepositoriesAdapter } from './shared/services/repositories.model';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SearchBarComponent,
        ResultsComponent,
        ProgressBarComponent,
        RepositoryDetailsComponent,
        IssuesDetailsComponent,
        StatisticsComponent,
        PieChartComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatCardModule,
        MatTabsModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatBadgeModule,
        MatListModule,
        MatGridListModule,
        HttpClientTestingModule,
        MatInputModule,
      ],
      providers: [RepositoriesService, RepositoriesAdapter],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should render search container with default placeholder`, () => {
    const defaultPlaceHolder = 'Search repository';
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const test = fixture.debugElement.query(By.css('.search-container'));
    const placeHolder = fixture.debugElement.query(By.css('.search-container .mat-input-element'));
    expect(test).toBeTruthy();
    expect(placeHolder.nativeElement.getAttribute('placeholder')).toEqual(defaultPlaceHolder);
  });
});
