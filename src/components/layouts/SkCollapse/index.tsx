import SkButton from "@/components/ui/SkButton";
import SvgIcon from "@/components/ui/SvgIcon";
import { useAppStore } from "@/stores";

interface Props {

}

const SkCollapse: React.FC<Props> = memo(() => {
  const { collapse, toggleSidebar } = useAppStore();
  const icon = collapse ? 'line-md:menu-fold-left' : 'line-md:menu-fold-right';
  const toggleCollapse = () => {
    toggleSidebar(!collapse);
  }
  return (
    <SkButton tooltipTitle={ collapse ? "展开菜单" : "折叠菜单" } tooltipPlacement="bottomLeft" onClick={ toggleCollapse }>
      <SvgIcon icon={icon} />
    </SkButton>
  );
});

export default SkCollapse;