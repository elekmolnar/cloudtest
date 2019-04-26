import { Injectable } from '@angular/core';
import { Adapter } from '../core/adapter';
import { RepositoriesModel } from './repositories.model';

interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
}

interface PullRequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
}

interface Item {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: string;
  locked: boolean;
  assignee?: any;
  assignees: any[];
  milestone?: any;
  comments: number;
  created_at: Date;
  updated_at: Date;
  closed_at?: Date;
  author_association: string;
  pull_request: PullRequest;
  body: string;
  score: number;
}

export class IssuesModel {
  constructor(public total_count: number, public incomplete_results: boolean, public items: Item[]) {}
}

@Injectable()
export class IssuesAdapter implements Adapter<IssuesModel> {
  adapt(item: any): IssuesModel {
    return new IssuesModel(item.total_count, item.incomplete_results, item.items);
  }
}
