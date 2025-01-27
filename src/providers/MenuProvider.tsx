import { useAppStore, useAuthStore, useTabStore } from "@/stores";
import { getMenusByAuthRoutes, getOpenKeys } from "./utils/MenuUtils";
import { MixMenuContext } from "@/layouts/context";

interface Props {
  children: React.ReactNode;
}

const MenuProvider: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const { collapse } = useAppStore();
  const { authRoutes } = useAuthStore();
  const menus = getMenusByAuthRoutes(authRoutes);

  const { activeFirstLevelMenuKey, setActiveFirstLevelMenuKey } = useTabStore();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState(collapse ? [] : getOpenKeys(pathname));

  useEffect(() => {
		setSelectedKeys([pathname]);
    if(!collapse) {
      setOpenKeys(getOpenKeys(pathname));
    }
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
    activeFirstLevelMenuKey: activeFirstLevelMenuKey,
    setActiveFirstLevelMenuKey: setActiveFirstLevelMenuKey,
    firstLevelMenu,
    selectedKeys,
    openKeys,
    setOpenKeys,
    isActiveFirstLevelMenuHasChildren: activeFirstLevelMenuKey ? Boolean(childLevelMenus) : false,
    childLevelMenus: childLevelMenus || [],
  };

  return <MixMenuContext.Provider value={mixMenuContext}>{children}</MixMenuContext.Provider>
}

export default MenuProvider;