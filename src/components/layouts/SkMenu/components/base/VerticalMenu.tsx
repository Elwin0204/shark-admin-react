import SkScrollbar from "@/components/ui/SkScrollbar";
import { useMixMenuContext } from "@/hooks/layout";
import { useAppStore, useThemeStore } from "@/stores";
import { Menu, type MenuProps } from "antd";
import useBaseStyle from '@/assets/styles/base';

const VerticalMenu = () => {
  const { styles: baseStyles, cx } = useBaseStyle();
  const { layout } = useThemeStore();
  const { collapse } = useAppStore();
  const navigator = useNavigate();
  const isMix = layout.includes("mix");
  const isVerticalMix = layout === "vertical-mix";
  const { allMenus, childLevelMenus, selectedKeys, openKeys, setOpenKeys } = useMixMenuContext();
  console.log("allMenus", allMenus, selectedKeys);

  const handleMenuSelect: MenuProps["onSelect"] = ({ item, key }) => {
    console.log("click", item, key);
    navigator(key);
  }

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    setOpenKeys(openKeys);
  }

  return (
    <SkScrollbar>
      <Menu
        mode="inline"
        items={isMix ? childLevelMenus : allMenus}
        inlineCollapsed={isVerticalMix ? false : collapse}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        inlineIndent={18}
        className={cx(baseStyles.sizeFull, baseStyles.transitionAll300)}
        onSelect={handleMenuSelect}
        onOpenChange={onOpenChange}
      />
    </SkScrollbar>
  );
}

export default VerticalMenu;