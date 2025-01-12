import { useAuthStore, useTabStore } from "@/stores";
import { getMenusByAuthRoutes } from "./MenuUtils";
import { MixMenuContext } from "./context";

interface Props {
  children: React.ReactNode;
}

const MenuProvider: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const { authRoutes, currentRoute } = useAuthStore();
  const menus = getMenusByAuthRoutes(authRoutes);

  const { activeFirstLevelMenuKey, setActiveFirstLevelMenuKey } = useTabStore();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);

  useEffect(() => {
		setSelectedKeys([pathname]);
		// isCollapse ? null : setOpenKeys(getOpenKeys(pathname));
	}, [pathname]);

  const firstLevelMenu = useMemo(
    () => menus.map((item) => {
      const { children: _, ...rest } = item;
      return rest;
    }) as App.Menu[],
    [menus]
  );

  const childLevelMenus = useMemo(() => menus.find((item) => item.key === activeFirstLevelMenuKey)?.children as App.Menu[], [activeFirstLevelMenuKey, menus]);

  const mixMenuContext = {
    allMenus: menus,
    activeFirstLevelMenuKey,
    setActiveFirstLevelMenuKey: setActiveFirstLevelMenuKey,
    firstLevelMenu,
    selectedKeys,
    isActiveFirstLevelMenuHasChildren: activeFirstLevelMenuKey ? Boolean(childLevelMenus) : false,
    childLevelMenus: childLevelMenus || [],
    route: currentRoute
  };

  return <MixMenuContext.Provider value={mixMenuContext}>{children}</MixMenuContext.Provider>
}

export default MenuProvider;