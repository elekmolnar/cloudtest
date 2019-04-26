import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RepositoriesAdapter } from './repositories.model';
import { map } from 'rxjs/operators';

@Injectable()
export class RepositoriesService {
  private readonly repositoryUrl: string;
  searchValue: Subject<string>;

  constructor(private http: HttpClient, private adapter: RepositoriesAdapter) {
    this.repositoryUrl = environment.githubAPIUrl;
    this.searchValue = new ReplaySubject<string>(1);
  }

  items(name: string) {
    const url = `${this.repositoryUrl}repositories?q=${name}`;
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/vnd.github.v3+json',
      }),
    };

    return this.http.get(url, httpOptions).pipe(map((res: any) => this.adapter.adapt(res)));
  }
}
