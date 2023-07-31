import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {DomSanitizer} from '@angular/platform-browser';
import {firstValueFrom} from 'rxjs';
import {Index} from '../data';
import {StoreService} from './store.service';

export const INDEX_ROUTE = 'index.json';

@Injectable({providedIn: 'root'})
export class DataService {
  private readonly httpClient = inject(HttpClient);
  private readonly storeService = inject(StoreService);
  private readonly domSanitizer = inject(DomSanitizer);

  constructor() {
    this.storeService.source$.pipe(takeUntilDestroyed()).subscribe(source => {
      void this.load(source);
    });
  }

  async load(source: string): Promise<void> {
    const index = await firstValueFrom(this.httpClient.get<Index>(`${source}/${INDEX_ROUTE}`));
    if (index.v !== 4) {
      console.log(`Storybook index version is not supported: ${index.v}. Only version 4 is supported`);
      return;
    }
    Object.entries(index.entries).forEach(([id, entry]) => {
      entry.url = this.domSanitizer.bypassSecurityTrustResourceUrl(`${source}/iframe.html?id=${id}&viewMode=story&shortcuts=false&singleStory=true`);
      entry.urlWithToolbar = this.domSanitizer.bypassSecurityTrustResourceUrl(`${source}/?path=/story/${id}&full=1&shortcuts=false&singleStory=true`);
    })
    this.storeService.updateIndex(index);
  }
}
