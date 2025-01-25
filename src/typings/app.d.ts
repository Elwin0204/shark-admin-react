declare namespace App {
  interface IconProps {
    icon?: string;
    localIcon?: string;
    style?: CSSProperties;
    className?: string;
  }

  interface Menu {
    key: string;
    label: React.ReactNode;
    i18nKey?: string | null;
    icon?: React.FunctionComponentElement<IconProps>;
    title?: string;
    children?: Menu[];
    _children?: Menu[];
  }

  interface HeaderProps {
    logoVisible: boolean;
    collapseVisible: boolean;
    breadcrumbVisible: boolean;
  }

  type LangOption = Record<UnionKey.LangKey, string>;
}