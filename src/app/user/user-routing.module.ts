import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchableSimpleRoute } from '../searchable-routes/routes/searchable-route';
import { SearchableRoutes } from '../searchable-routes/routes/types';
import { SearchableRoutesModule } from '../searchable-routes/searchable-routes.module';

export const userRoutes: SearchableRoutes = [
  new SearchableSimpleRoute({
    path: '',
    title: '',
    description: '',
    children: [
      new SearchableSimpleRoute({
        path: 'edit',
        title: '',
        description: '',
      }),
      new SearchableSimpleRoute({
        path: 'new',
        title: '',
        description: '',
      }),
    ],
  }),
];

@NgModule({
  imports: [SearchableRoutesModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
