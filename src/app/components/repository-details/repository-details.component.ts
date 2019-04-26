import { Component, Input } from '@angular/core';
import { Item } from '../../shared/services/repositories.model';

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss'],
})
export class RepositoryDetailsComponent {
  @Input() item: Item;
}
