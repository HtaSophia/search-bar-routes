import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {
  SearchableLazyRoute,
  SearchableSimpleRoute,
  SimpleRoute,
} from './searchable-routes/routes/searchable-route';
import { SearchableRoutes } from './searchable-routes/routes/types';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'user',
    loadChildren: async () => (await import('./user/user.module')).UserModule,
  },
  {
    path: 'product',
    loadChildren: async () =>
      (await import('./product/product.module')).ProductModule,
  },
];

const _routes: SearchableRoutes = [
  new SimpleRoute({
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }),
  new SearchableSimpleRoute({
    path: 'home',
    component: HomeComponent,
    title: '',
    description: '',
  }),
  new SearchableLazyRoute({
    path: 'user',
    ngModule: 'UserModule',
    moduleUrl: './user/user.module',
    title: '',
    description: '',
  }),
  new SearchableLazyRoute({
    path: 'product',
    ngModule: 'ProductModule',
    moduleUrl: './product/product.module',
    title: '',
    description: '',
  }),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
