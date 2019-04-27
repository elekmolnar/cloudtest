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
  @Input() id: number;
  @Input() previousId: number;
  @Output() issuesId = new EventEmitter<number>();
  private unsubscribe: Subject<void> = new Subject();
  issuesContent: IssuesModel;

  constructor(private issuesService: IssuesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const previousIssues = changes.previousIssues;
    const id = changes.id;
    const isNoPreviousContent =
      (previousIssues && !previousIssues.currentValue) || (id && id.currentValue !== this.previousId);
    const isNotEqualId = id && id.currentValue !== this.previousId;
    const isEqualId = id && id.currentValue === this.previousId;
    const isPreviousContent = previousIssues && previousIssues.currentValue;

    if (isNoPreviousContent || isNotEqualId) {
      this.getIssues();
    }
    if (isPreviousContent && isEqualId) {
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
          this.issuesId.emit(this.id);
        },
        err => console.log(err)
      );
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
