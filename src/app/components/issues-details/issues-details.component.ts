import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IssuesService } from '../../shared/services/issues.service';
import { Subscription } from 'rxjs';
import { IssuesModel } from '../../shared/services/issues.model';

@Component({
  selector: 'app-issues-details',
  templateUrl: './issues-details.component.html',
  styleUrls: ['./issues-details.component.scss'],
})
export class IssuesDetailsComponent implements OnInit, OnDestroy {
  @Input() owner: string;
  @Input() repository: string;
  private issuesSubscription: Subscription;
  issuesContent: IssuesModel;

  constructor(private issuesService: IssuesService) {}

  ngOnInit() {
    this.issuesSubscription = this.issuesService
      .issues(this.owner, this.repository)
      .subscribe((issuesData: IssuesModel) => (this.issuesContent = issuesData), err => console.log(err));
  }

  ngOnDestroy() {
    this.issuesSubscription.unsubscribe();
  }
}
