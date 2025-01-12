import SkScrollbar from "@/components/ui/SkScrollbar";
import { useMixMenuContext } from "@/hooks/layout";
import { useAppStore, useThemeStore } from "@/stores";
import { Menu, type MenuProps } from "antd";
import useBaseStyle from '@/assets/styles/base';

const VerticalMenu = () => {
  const { styles: baseStyles, cx } = useBaseStyle();
  const { layout } = useThemeStore();
  const { collapse } = useAppStore();
  const isMix = layout.includes("mix");
  const isVerticalMix = layout === "vertical-mix";
  const { allMenus, childLevelMenus, selectedKeys, route } = useMixMenuContext();
  console.log("allMenus", allMenus, selectedKeys, route);

  const handleMenuSelect: MenuProps["onSelect"] = ({ item, key }) => {
    console.log("click", item, key);
  }

  return (
    <SkScrollbar>
      <Menu
        mode="inline"
        items={isMix ? childLevelMenus : allMenus}
        inlineCollapsed={isVerticalMix ? false : collapse}
        selectedKeys={selectedKeys}
        inlineIndent={18}
        className={cx(baseStyles.sizeFull, baseStyles.transitionAll300)}
        onSelect={handleMenuSelect}
      />
    </SkScrollbar>
  );
}

export default VerticalMenu;