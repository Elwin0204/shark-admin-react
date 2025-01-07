import { RouteObject } from "react-router-dom";

export interface RouteMeta {
  title?: string;
  icon?: string;
  hidden?: boolean;
  affix?: boolean;
  type?: string;
  link?: string;
  sort?: number;
  keepAlive?: boolean;
  auth?: boolean;
  roles?: string[];
}

export interface ExtendedRouteObject extends RouteObject {
  path?: string;
  key?: string;
  element?: ReactNode;
  children?: ExtendedRouteObject[];
  meta?: RouteMeta;
}

type EagerModuleExports = {
  default: ExtendedRouteObject[];
};

export type EagerRouteModules = {
  [key: string]: EagerModuleExports;
};