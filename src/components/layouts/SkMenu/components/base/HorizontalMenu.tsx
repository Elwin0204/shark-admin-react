import { Menu, MenuProps } from "antd";
import useBaseStyle from '@/assets/styles/base';
import useStyle from "../../style";

interface Props {
  mode: UnionKey.MenuMode;
}

function isHasChildren(menus: App.Menu[], key: string) {
  return menus.some(item => item.key === key && item.children?.length);
}

const HorizontalMenu: React.FC<Props> = ({ mode }) => {
  const { styles: baseStyles, cx } = useBaseStyle();
  const { styles } = useStyle();
  const navigator = useNavigate();
  const { allMenus, childLevelMenus, firstLevelMenu, selectedKeys } = useMixMenuContext();
  const menuMap = new Map<UnionKey.MenuMode, App.Menu[]>([
    ["1", allMenus],
    ["2", childLevelMenus],
    ["3", firstLevelMenu]
  ]);

  const handleMenuSelect: MenuProps["onSelect"] = ({ key }) => {
    if(mode === "3" && isHasChildren(allMenus, key)) {
      console.log("mode3 && children");
    } else {
      navigator(key);
    }
  }
  return (
    <Menu
      mode="horizontal"
      items={menuMap.get(mode)}
      inlineIndent={18}
      onSelect={handleMenuSelect}
      selectedKeys={selectedKeys}
      className={cx(baseStyles.sizeFull, baseStyles.transitionAll300, styles.horizontalMenu)}
      style={{border: '0 !important'}}
    />
  );
}

export default HorizontalMenu;