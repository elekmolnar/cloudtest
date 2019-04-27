import { TestBed } from '@angular/core/testing';

import { IssuesService } from './issues.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IssuesAdapter } from './issues.model';

describe('IssuesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IssuesService, IssuesAdapter],
    })
  );

  it('should be created', () => {
    const service: IssuesService = TestBed.get(IssuesService);
    expect(service).toBeTruthy();
  });
});
