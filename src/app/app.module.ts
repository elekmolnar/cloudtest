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
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatTooltipModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RepositoriesService } from './shared/services/repositories.service';
import { ResultsComponent } from './components/results/results.component';
import { HttpClientModule } from '@angular/common/http';
import { RepositoriesAdapter } from './shared/services/repositories.model';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';

@NgModule({
  declarations: [AppComponent, SearchBarComponent, ResultsComponent, ProgressBarComponent],
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [RepositoriesService, RepositoriesAdapter],
  bootstrap: [AppComponent],
})
export class AppModule {}
