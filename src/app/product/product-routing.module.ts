import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchableSimpleRoute } from '../searchable-routes/routes/searchable-route';
import { SearchableRoutes } from '../searchable-routes/routes/types';
import { SearchableRoutesModule } from '../searchable-routes/searchable-routes.module';

export const productRoutes: SearchableRoutes = [
  new SearchableSimpleRoute({
    path: '',
    title: '',
    description: '',
  }),
];

@NgModule({
  imports: [SearchableRoutesModule.forChild(productRoutes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
