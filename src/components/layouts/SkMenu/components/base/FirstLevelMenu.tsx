import { cloneElement } from "react";
import useBaseStyles from '@/assets/styles/base';
import useStyles from "../../style";
import { transformColorWithOpacity } from "@/utils/color";
import { useThemeStore } from "@/stores";

interface Props {
  inverted?: boolean;
  children?: React.ReactNode;
  onSelect?: () => void;
}

interface MixMenuItemProps {
  menu: App.Menu;
  onClick?: () => void;
  active: boolean;
  inverted?: boolean;
  setActiveFirstLevelMenuKey: (key: string) => void;
}

function MixMenuItem(Props: MixMenuItemProps) {
  const { menu: { icon, label, key, children }, active, inverted, onClick, setActiveFirstLevelMenuKey } = Props;
  const { darkMode, primaryColor } = useThemeStore();
  const navigator = useNavigate();
  const { styles: baseStyles, cx } = useBaseStyles();
  const { styles } = useStyles();

  const selectedBgColor = useMemo(() => {
    const light = transformColorWithOpacity(primaryColor, 0.1, '#ffffff');
    const dark = transformColorWithOpacity(primaryColor, 0.3, '#000000');
    return darkMode ? dark : light;
  }, [darkMode, primaryColor]);

  function handleMixMenuClick() {
    setActiveFirstLevelMenuKey(key);

    if(children?.length) {
      if(onClick) onClick();
    } else {
      navigator(key);
    }
  }

  return (
    <div className={cx(baseStyles.flexColCenter, baseStyles.cursorPointer, styles.mixMenuItem, baseStyles.transitionAll300)} style={{background: active ? selectedBgColor : ""}} onClick={handleMixMenuClick}>
      {icon && cloneElement(icon, { className: baseStyles.textIconLarge })}
      <p className={cx(baseStyles.wFull, styles.mixMenuItemLabel, baseStyles.ellipsisText, baseStyles.textCenter, baseStyles.transitionAll300)}>
        {label}
      </p>
    </div>
  );
}

const FirstLevelMenu: React.FC<Props> = memo(({ children, inverted, onSelect }) => {
  const { styles: baseStyles, cx } = useBaseStyles();
  const { allMenus, activeFirstLevelMenuKey, setActiveFirstLevelMenuKey } = useMixMenuContext();

  return (
    <div className={cx(baseStyles.hFull, baseStyles.flexColStretch, baseStyles.flex1Hidden)}>
      {children}
      <SkScrollbar>
        {allMenus.map((item) => (
          <MixMenuItem key={item.key} onClick={onSelect} setActiveFirstLevelMenuKey={setActiveFirstLevelMenuKey} inverted={inverted} active={item.key === activeFirstLevelMenuKey} menu={item} />
        ))}
      </SkScrollbar>
    </div>
  );
});

export default FirstLevelMenu;