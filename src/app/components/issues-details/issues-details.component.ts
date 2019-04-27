import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { IssuesService } from '../../shared/services/issues.service';
import { Subject } from 'rxjs';
import { IssuesModel } from '../../shared/services/issues.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-issues-details',
  templateUrl: './issues-details.component.html',
  styleUrls: ['./issues-details.component.scss'],
})
export class IssuesDetailsComponent implements OnChanges, OnDestroy {
  @Input() owner: string;
  @Input() repository: string;
  @Input() previousIssues: IssuesModel;
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
