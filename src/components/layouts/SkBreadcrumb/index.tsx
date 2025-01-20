import { Breadcrumb, BreadcrumbItemProps, BreadcrumbProps, MenuProps } from "antd";
import { findLastLevelKey, getBreadcrumbs } from "./shared";
import { cloneElement } from "react";
import useBaseStyle from "@/assets/styles/base";
import useStyle from "./style";

type SkBreadcrumbProps = Omit<BreadcrumbItemProps, "items">;

function BreadcrumbContent({ label, icon, children }: { label: JSX.Element; icon: JSX.Element, children: App.Menu[] }) {
  const { styles: baseStyles, cx } = useBaseStyle();
  const { styles } = useStyle();
  return (
    <div className={cx(baseStyles.iFlexYCenter, baseStyles.alignMiddle, children && children.length > 0 ? baseStyles.cursorPointer : "")}>
      {cloneElement(icon, { className: cx(baseStyles.textIcon, styles.breadcrumbIcon), ...icon.props })}
      {label}
    </div>
  );
}

const SkBreadcrumb: React.FC<SkBreadcrumbProps> = (props) => {
  const { pathname } = useLocation();
  const navigator = useNavigate();
  const { allMenus: menus } = useMixMenuContext();
  const breadcrumbs = getBreadcrumbs(pathname, menus);

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    const targetKey = findLastLevelKey(key, breadcrumbs);
    if(targetKey) {
      navigator(targetKey);
    }
  }

  const items: BreadcrumbProps['items'] = breadcrumbs.map((item, index) => {
    const breadcrumbTitle = (
      <BreadcrumbContent
        key={item.key}
        label={item.label as JSX.Element}
        icon={item.icon as JSX.Element}
        children={item.children as App.Menu[]}
      />
    );

    return {
      title: breadcrumbTitle,
      ...('children' in item &&
        item.children && {
          menu: {
            items: item.children.filter(Boolean),
            onClick: handleMenuClick,
            selectedKeys: [breadcrumbs[index + 1]?.key] as string[]
          }
        })
    };
  });

  return (
    <Breadcrumb items={items} {...props} />
  );
};

export default SkBreadcrumb;