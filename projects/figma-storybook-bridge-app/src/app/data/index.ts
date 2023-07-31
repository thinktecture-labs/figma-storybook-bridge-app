import {SafeResourceUrl} from '@angular/platform-browser';

export interface Entry {
  id: string;
  title: string;
  name: string;
  importPath: string;
  tags: string[];
  url: SafeResourceUrl;
  urlWithToolbar: SafeResourceUrl;
}

export interface Entries {
  [entryId: string]: Entry;
}

export interface Index {
  v: number;
  entries: Entries;
}
