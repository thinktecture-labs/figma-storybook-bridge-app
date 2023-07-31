import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {Router} from '@angular/router';
import {DataService} from '../store/data.service';
import {StoreService} from '../store/store.service';

@Component({
  selector: 'labs-setup',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent {
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);
  private readonly storeService = inject(StoreService);
  source$ = this.storeService.source$; // https://konstantin-denerz.com/design-system-impl-material
  source = '';


  async sync() {
    const {source} = this;
    if (!!source) {
      await this.dataService.load(source);
      await this.storeService.persistSource(source);
      parent.postMessage({pluginMessage: {type: 'assignSource', source}, pluginId: '*'}, '*');
      await this.router.navigate(['list']);
    }
  }
}
