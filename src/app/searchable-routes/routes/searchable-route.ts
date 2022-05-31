import { Type } from '@angular/core';
import { Route } from '@angular/router';
import { SearchableRoutesModule } from '../searchable-routes.module';
import {
  AngularRouteBuilder,
  RouteInterface,
  SearchableLazyRouteProps,
  SearchableRoute,
  SearchableRouteProps,
} from './types';

export class SimpleRoute implements AngularRouteBuilder {
  constructor(private readonly route: Route) {}

  public buildAngularRoutes(): Route {
    return this.route;
  }
}

export class SearchableSimpleRoute implements AngularRouteBuilder {
  public readonly title!: string;
  public readonly description!: string;
  public readonly children: SearchableRoute[] = [];
  private readonly route!: Route;

  constructor(route: RouteInterface & SearchableRouteProps) {
    const { title, description, children, ...rest } = route;

    this.title = title;
    this.description = description;
    this.children = children ?? [];
    this.route = rest;
  }

  public buildAngularRoutes(): Route {
    return {
      ...this.route,
      children: this.children?.map((route) => route.buildAngularRoutes()),
    };
  }
}

export class SearchableLazyRoute implements AngularRouteBuilder {
  private searchableRoute!: SearchableRoute;
  public moduleUrl!: string;
  public ngModule!: String;

  constructor(route: RouteInterface & SearchableLazyRouteProps) {
    const { moduleUrl, ngModule, ...rest } = route;
    this.searchableRoute = new SearchableSimpleRoute(rest);

    this.moduleUrl = route.moduleUrl;
    this.ngModule = route.ngModule;
  }

  public buildAngularRoutes(): Route {
    return {
      ...this.searchableRoute.buildAngularRoutes(),
      loadChildren: async () => (await import(this.moduleUrl))[this.moduleUrl],
    };
  }
}
