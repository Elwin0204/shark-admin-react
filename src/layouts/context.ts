import { ExtendedRouteObject } from "@/typings/router";
import { createContext } from "react";

export interface MixMenuContextProps {
  activeFirstLevelMenuKey: string;
  setActiveFirstLevelMenuKey: (key?: string) => void;
  firstLevelMenu: App.Menu[];
  allMenus: App.Menu[];
  childLevelMenus: App.Menu[];
  isActiveFirstLevelMenuHasChildren: boolean;
  selectedKeys: string[];
  route: ExtendedRouteObject | null;
}

function voidFunc () {}

export const MixMenuContext = createContext<MixMenuContextProps>({
  activeFirstLevelMenuKey: "",
  setActiveFirstLevelMenuKey: voidFunc,
  firstLevelMenu: [],
  allMenus: [],
  childLevelMenus: [],
  isActiveFirstLevelMenuHasChildren: false,
  selectedKeys: [],
  route: {}
});