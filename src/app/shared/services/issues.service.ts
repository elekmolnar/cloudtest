import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IssuesAdapter } from './issues.model';

@Injectable()
export class IssuesService {
  private readonly issuesUrl: string;

  constructor(private http: HttpClient, private adapter: IssuesAdapter) {
    this.issuesUrl = environment.githubAPIUrl;
  }

  issues(login: string, name: string) {
    const url = `${this.issuesUrl}issues?q=repo:${login}/${name}`;

    return this.http.get(url).pipe(map((res: any) => this.adapter.adapt(res)));
  }
}
