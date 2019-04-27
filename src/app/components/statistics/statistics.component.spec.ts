import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsComponent } from './statistics.component';
import { PieChartComponent } from '../../shared/components/pie-chart/pie-chart.component';
import { MatGridListModule } from '@angular/material';
import { IssuesService } from '../../shared/services/issues.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IssuesAdapter } from '../../shared/services/issues.model';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsComponent, PieChartComponent],
      imports: [MatGridListModule, HttpClientTestingModule],
      providers: [IssuesService, IssuesAdapter],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
