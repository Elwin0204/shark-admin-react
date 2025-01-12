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
  }
}