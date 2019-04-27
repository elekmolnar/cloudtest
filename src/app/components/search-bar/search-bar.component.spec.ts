import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RepositoriesService } from '../../shared/services/repositories.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RepositoriesAdapter } from '../../shared/services/repositories.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        FormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [RepositoriesService, RepositoriesAdapter],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
