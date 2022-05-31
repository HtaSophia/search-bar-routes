import { Type } from '@angular/core';
import { Route } from '@angular/router';

export type RouteInterface = Omit<Route, 'children' | 'loadChildren'>;

export interface AngularRouteBuilder {
  buildAngularRoutes(): Route;
}

export interface SearchableRouteProps {
  title: string;
  description: string;
  children?: SearchableRoute[];
}

export type SearchableRoute =
  | (SearchableRouteProps & AngularRouteBuilder)
  | AngularRouteBuilder;
export type SearchableRoutes = SearchableRoute[];

export interface SearchableLazyRouteProps extends SearchableRouteProps {
  moduleUrl: string;
  ngModule: String;
}
