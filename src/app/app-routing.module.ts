import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { productRoutes } from './product/product-routing.module';
import {
  SearchableLazyRoute,
  SearchableSimpleRoute,
  SimpleRoute,
} from './searchable-routes/routes/searchable-route';
import { SearchableRoutes } from './searchable-routes/routes/types';
import { SearchableRoutesModule } from './searchable-routes/searchable-routes.module';
import { userRoutes } from './user/user-routing.module';

const routes: SearchableRoutes = [
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
    title: '',
    description: '',
    loadChildren: async () => (await import('./user/user.module')).UserModule,
    children: userRoutes,
  }),
  new SearchableLazyRoute({
    path: 'product',
    loadChildren: async () =>
      (await import('./product/product.module')).ProductModule,
    title: '',
    description: '',
    children: productRoutes,
  }),
];

@NgModule({
  imports: [SearchableRoutesModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
