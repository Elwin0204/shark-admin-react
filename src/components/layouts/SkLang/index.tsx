import defaultSettings from "@/config";
import { Button, Dropdown } from "antd";
import { MenuProps } from "antd/es/menu";
import useBaseStyles from '@/assets/styles/base';
import useStyles from "./style";
import { useAppStore } from "@/stores";

const { langOptions } = defaultSettings;

const SkLang: React.FC = () => {
  const { styles: baseStyles } = useBaseStyles();
  const { styles, cx } = useStyles();
  const { lang, setLang } = useAppStore();
  const items: MenuProps["items"] = Object.keys(langOptions).map((key) => {
    return {
      key: key,
      label: <span className="dropdown-item">{langOptions[key as UnionKey.LangKey]}</span>
    };
  });

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setLang(key as UnionKey.LangKey);
  };

  return (
    <Dropdown menu={{ items, selectable: true, defaultSelectedKeys: [lang], onClick }} placement="bottom" arrow trigger={["click"]}>
      <Button type="text" className={cx(styles.skLang, baseStyles.textIcon)}>
        <SvgIcon icon="iconoir:language" />
      </Button>
    </Dropdown>
  );
};

export default SkLang;