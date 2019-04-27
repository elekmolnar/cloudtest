import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatBadgeModule,
  MatButtonModule,
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RepositoriesService } from './shared/services/repositories.service';
import { ResultsComponent } from './components/results/results.component';
import { HttpClientModule } from '@angular/common/http';
import { RepositoriesAdapter } from './shared/services/repositories.model';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { RepositoryDetailsComponent } from './components/repository-details/repository-details.component';
import { IssuesDetailsComponent } from './components/issues-details/issues-details.component';
import { IssuesService } from './shared/services/issues.service';
import { IssuesAdapter } from './shared/services/issues.model';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PieChartComponent } from './shared/components/pie-chart/pie-chart.component';

@NgModule({
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
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatTooltipModule,
    MatTabsModule,
    MatListModule,
    MatGridListModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [RepositoriesService, RepositoriesAdapter, IssuesService, IssuesAdapter],
  bootstrap: [AppComponent],
})
export class AppModule {}
