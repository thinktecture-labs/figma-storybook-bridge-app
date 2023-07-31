import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import {RouterLink} from '@angular/router';
import {map} from 'rxjs';
import {StoreService} from '../store/store.service';
import {StoryCardComponent} from '../story-card/story-card.component';

@Component({
  selector: 'labs-list',
  standalone: true,
  imports: [CommonModule, StoryCardComponent, RouterLink, MatRippleModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  private readonly storeService = inject(StoreService);
  entries$ = this.storeService.entries$.pipe(map(entries => entries.filter(entry => entry.tags.indexOf('story') !== -1)));

  assign(id: string) {
    parent.postMessage({pluginMessage: {story: id, type: 'assignStory'}, pluginId:'*' }, '*');
  }
}
