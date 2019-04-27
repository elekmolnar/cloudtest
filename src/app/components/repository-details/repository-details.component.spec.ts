import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryDetailsComponent } from './repository-details.component';
import { MatBadgeModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { mockRepositories } from '../../shared/mocks/mock-repositories';
import { By } from '@angular/platform-browser';

describe('RepositoryDetailsComponent', () => {
  let component: RepositoryDetailsComponent;
  let fixture: ComponentFixture<RepositoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoryDetailsComponent],
      imports: [MatBadgeModule, MatTooltipModule, MatIconModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render item details', () => {
    component.item = mockRepositories.items[0];
    fixture.detectChanges();
    const name = fixture.debugElement.query(By.css('.repository-details-container .owner-container .mat-body-strong'));
    const html = fixture.debugElement.query(By.css('.repository-details-container .result-html'));
    const owner = fixture.debugElement.query(By.css('.repository-details-container .details-owner'));
    const description = fixture.debugElement.query(By.css('.repository-details-container .details-description'));
    const updated = fixture.debugElement.query(By.css('.repository-details-container .details-updated'));

    expect(name.nativeElement.textContent).toBe('bootstrap');
    expect(html.nativeElement.textContent).toBe('https://github.com/twbs/bootstrap');
    expect(owner.nativeElement.textContent).toBe('twbs');
    expect(description.nativeElement.textContent).toBe(
      'The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.'
    );
    expect(updated.nativeElement.textContent).toBe('Apr 27, 2019, 5:00:46 PM');
  });
});
