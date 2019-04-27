import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { IssuesModel } from '../../shared/services/issues.model';
import { Subject } from 'rxjs';
import { IssuesService } from '../../shared/services/issues.service';
import { takeUntil } from 'rxjs/operators';
import { Item, RepositoriesModel } from '../../shared/services/repositories.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnChanges, OnDestroy {
  @Input() owner: string;
  @Input() repository: string;
  @Input() previousIssues: IssuesModel;
  @Input() repositoryItem: Item;
  @Input() id: number;
  @Input() previousId: number;
  @Output() issuesLoaded = new EventEmitter<IssuesModel>();
  @Output() issuesId = new EventEmitter<number>();
  private unsubscribe: Subject<void> = new Subject();
  issuesContent: IssuesModel;
  pieData: PieDataModel[];

  constructor(private issuesService: IssuesService) {
    this.pieData = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    const previousIssues = changes.previousIssues;
    const id = changes.id;
    const repositoryItem = changes.repositoryItem;
    const isNoPreviousContent =
      (previousIssues && !previousIssues.currentValue) || (id && id.currentValue !== this.previousId);
    const isNotEqualId = id && id.currentValue !== this.previousId;
    const isEqualId = id && id.currentValue === this.previousId;
    const isPreviousContent = previousIssues && previousIssues.currentValue;
    const repositoryItemLoaded = repositoryItem && repositoryItem.currentValue;

    if (isNoPreviousContent || isNotEqualId) {
      this.getIssues();
    }
    if (isPreviousContent && isEqualId) {
      this.issuesContent = previousIssues.currentValue;
    }
    if (repositoryItemLoaded) {
      this.transformPieData();
    }
  }

  private getIssues() {
    this.issuesService
      .issues(this.owner, this.repository)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (issuesData: IssuesModel) => {
          this.issuesContent = issuesData;
          this.issuesLoaded.emit(issuesData);
          this.issuesId.emit(this.id);
        },
        err => console.log(err)
      );
  }

  private transformPieData(): void {
    this.pieData.push(
      {
        label: `Forks: ${this.repositoryItem.forks_count}`,
        count: this.repositoryItem.forks_count,
      },
      {
        label: `Watchers: ${this.repositoryItem.watchers_count}`,
        count: this.repositoryItem.watchers_count,
      },
      {
        label: `Stargazers: ${this.repositoryItem.stargazers_count}`,
        count: this.repositoryItem.stargazers_count,
      },
      {
        label: `Open issues: ${this.repositoryItem.open_issues_count}`,
        count: this.repositoryItem.open_issues_count,
      }
    );
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
