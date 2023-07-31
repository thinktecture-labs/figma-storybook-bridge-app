import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {Entry} from '../data';

@Component({
  selector: 'labs-story-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss']
})
export class StoryCardComponent {
  @Input({required: true}) entry?: Entry;
  @Input() showToolbar = false;
  @Input() showBack = false;
  @Input() showCancel = false;
  @Output() disableSync = new EventEmitter();
}
