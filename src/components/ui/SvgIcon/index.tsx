import type { CSSProperties } from 'react';
import { Icon } from '@iconify/react';

interface Props {
  icon?: string;
  localIcon?: string;
  style?: CSSProperties;
  className?: string;
}

const defaultLocalIcon = 'no-icon';
const symbolId = (localIcon: string = defaultLocalIcon) => {
  const iconName = localIcon || defaultLocalIcon;

  return `#icon-${iconName}`;
};
const SvgIcon = ({ icon, localIcon, ...props }: Props) => {
  return localIcon || !icon ? (
    <svg
      width="1em"
      height="1em"
      {...props}
      aria-hidden="true"
    >
      <use
        href={symbolId(localIcon)}
        fill="currentColor"
      />
    </svg>
  ) : (
    <Icon
      icon={icon}
      {...props}
    />
  );
};

export default SvgIcon;
