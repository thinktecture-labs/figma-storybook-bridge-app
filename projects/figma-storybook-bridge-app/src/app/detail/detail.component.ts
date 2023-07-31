import {CommonModule} from '@angular/common';
import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {Entry} from '../data';
import {StoreService} from '../store/store.service';
import {StoryCardComponent} from '../story-card/story-card.component';

@Component({
  selector: 'labs-detail',
  standalone: true,
  imports: [CommonModule, StoryCardComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnChanges {
  @Input({required: true}) id!: string;
  entry$: Observable<Entry | undefined> = EMPTY;
  private readonly storeService = inject(StoreService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.entry$ = this.storeService.getEntryBy(this.id);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.entry$ = this.storeService.getEntryBy(this.id);
  }

  async disconnect() {
    parent.postMessage({pluginMessage: {type: 'removeStory', id: this.id}, pluginId: '*'}, '*');
    await this.router.navigate(['list']);
  }
}
