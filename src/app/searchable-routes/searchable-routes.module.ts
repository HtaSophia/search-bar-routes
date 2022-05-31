import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularSearchableRoutes } from './routes/searchable-route';
import { SearchableRoutes } from './routes/types';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
})
export class SearchableRoutesModule {
  static forRoot(routes: SearchableRoutes): ModuleWithProviders<RouterModule> {
    const searchableRoutes = new AngularSearchableRoutes(routes);
    return RouterModule.forRoot(searchableRoutes.buildAngularRoutes());
  }

  static forChild(routes: SearchableRoutes): ModuleWithProviders<RouterModule> {
    const searchableRoutes = new AngularSearchableRoutes(routes);
    return RouterModule.forChild(searchableRoutes.buildAngularRoutes());
  }
}
