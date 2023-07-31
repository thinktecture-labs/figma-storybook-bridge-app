import {Injectable} from '@angular/core';
import {map, Observable, ReplaySubject} from 'rxjs';
import {Entry, Index} from '../data';


@Injectable({providedIn: 'root'})
export class StoreService {
  private readonly index$$ = new ReplaySubject<Index>(1);
  private readonly source$$ = new ReplaySubject<string>(1);
  entries$ = this.index$$.asObservable().pipe(map(index => index ? Object.values(index.entries) ?? [] : []));
  source$ = this.source$$.asObservable();

  constructor() {
  }

  updateIndex(index: Index) {
    this.index$$.next(index);
  }

  persistSource(source: string) {
    this.source$$.next(source);
  }

  getEntryBy(id: string): Observable<Entry> {
    return this.index$$.pipe(map(index => index.entries[id]));
  }
}
