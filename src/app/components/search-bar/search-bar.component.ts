import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('inputElement') inputElementRef: ElementRef;
  searchValue$: Observable<string>;
  searchValueSubscription: Subscription;

  constructor() {}

  ngAfterViewInit() {
    this.searchValue$ = fromEvent(this.inputElementRef.nativeElement, 'input').pipe(
      debounceTime(600),
      map((e: KeyboardEvent) => e.target['value']),
      distinctUntilChanged()
    );

    this.searchValueSubscription = this.searchValue$.subscribe((val: string) => {
      console.log(val);
    });
  }

  ngOnDestroy() {
    this.searchValueSubscription.unsubscribe();
  }
}
