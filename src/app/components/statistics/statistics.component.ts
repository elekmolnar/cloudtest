import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { IssuesModel } from '../../shared/services/issues.model';
import { Subject } from 'rxjs';
import { IssuesService } from '../../shared/services/issues.service';
import { takeUntil } from 'rxjs/operators';
import { RepositoriesModel } from '../../shared/services/repositories.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnChanges, OnDestroy {
  @Input() owner: string;
  @Input() repository: string;
  @Input() previousIssues: IssuesModel;
  @Input() repositories: RepositoriesModel;
  @Output() issuesLoaded = new EventEmitter<IssuesModel>();
  private unsubscribe: Subject<void> = new Subject();
  issuesContent: IssuesModel;

  constructor(private issuesService: IssuesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const previousIssues = changes.previousIssues;
    if (previousIssues && !previousIssues.currentValue) {
      this.getIssues();
    } else {
      this.issuesContent = previousIssues.currentValue;
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
        },
        err => console.log(err)
      );
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
