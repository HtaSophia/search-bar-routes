import { Type } from '@angular/core';
import { LoadChildrenCallback, Route } from '@angular/router';
import { SearchableRoutesModule } from '../searchable-routes.module';
import {
  AngularRouteBuilder,
  AngularRoutesBuilder,
  RouteInterface,
  SearchableLazyRouteProps,
  SearchableRoute,
  SearchableRouteProps,
  SearchableRoutes,
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
  public readonly children?: SearchableRoute[];
  private readonly route!: Route;

  constructor(route: RouteInterface & SearchableRouteProps) {
    const { title, description, children, ...rest } = route;

    this.title = title;
    this.description = description;
    this.children = children;
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
  public loadChildren!: LoadChildrenCallback;
  public readonly children: SearchableRoute[] = [];
  private searchableRoute!: SearchableRoute;

  constructor(route: RouteInterface & SearchableLazyRouteProps) {
    const { loadChildren, children, ...rest } = route;

    this.loadChildren = loadChildren;
    this.children = children;

    this.searchableRoute = new SearchableSimpleRoute(rest);
  }

  public buildAngularRoutes(): Route {
    if (this.children.length === 0) {
      throw new Error('Children array for lazy load modules cant be empty');
    }

    return {
      ...this.searchableRoute.buildAngularRoutes(),
      loadChildren: this.loadChildren,
    };
  }
}

export class AngularSearchableRoutes implements AngularRoutesBuilder {
  constructor(private readonly routes: SearchableRoutes) {}

  public buildAngularRoutes(): Route[] {
    return this.routes.map((route) => route.buildAngularRoutes());
  }
}
