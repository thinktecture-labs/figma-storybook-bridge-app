import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {DataService} from './store/data.service';
import {StoreService} from './store/store.service';

@Component({
  selector: 'labs-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);
  public readonly storeService = inject(StoreService);

  constructor() {
    window.onmessage = async ({data}) => {
      const {pluginMessage} = data;
      if (pluginMessage?.type === 'selectStory') {
        void this.router.navigate(['/detail', pluginMessage.story]);
      } else if (pluginMessage?.type === 'assignSource') {
        const {source} = pluginMessage;
        this.storeService.persistSource(source);
        await this.dataService.load(source);
        await this.router.navigate(['list']);
      } else if (pluginMessage.type === 'showOverview') {
        await this.router.navigate(['list']);
      }
    }
  }
}
