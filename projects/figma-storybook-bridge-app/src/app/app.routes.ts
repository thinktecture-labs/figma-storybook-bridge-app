import {Routes} from '@angular/router';
import {DetailComponent} from './detail/detail.component';
import {ListComponent} from './list/list.component';
import {SetupComponent} from './setup/setup.component';

export const routes: Routes = [
  {path: '', redirectTo: 'setup', pathMatch: 'full'},
  {path: 'setup', component: SetupComponent},
  {path: 'list', component: ListComponent},
  {path: 'detail/:id', component: DetailComponent}
];
