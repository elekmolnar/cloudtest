import { Component, OnDestroy, OnInit } from '@angular/core';
import { RepositoriesService } from '../../shared/services/repositories.service';
import { Subscription } from 'rxjs';
import { RepositoriesModel } from '../../shared/services/repositories.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit, OnDestroy {
  private subscriptionSearch: Subscription;
  private subscriptionData: Subscription;
  private isLoading: boolean;
  repositoriesContent: RepositoriesModel;

  constructor(private repositories: RepositoriesService) {}

  ngOnInit() {
    this.subscriptionSearch = this.repositories.searchValue.subscribe(value => this.getRepositoriesData(value));
  }

  getRepositoriesData(value: string): void {
    this.isLoading = true;
    this.subscriptionData = this.repositories
      .items(value)
      .subscribe(
        (repositoriesData: RepositoriesModel) => (this.repositoriesContent = repositoriesData),
        err => console.log(err),
        () => (this.isLoading = false)
      );
  }

  trackId(index, item) {
    return item ? item.id : undefined;
  }

  ngOnDestroy() {
    this.subscriptionSearch.unsubscribe();
    this.subscriptionData.unsubscribe();
  }
}
