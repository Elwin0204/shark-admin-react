import { Button, ButtonProps, Tooltip } from "antd";
import { TooltipPlacement } from "antd/es/tooltip";
import classNames from "classnames";
import React, { CSSProperties } from "react";
import SvgIcon from "../SvgIcon";
import useBaseStyles from '@/assets/styles/base';
import useStyles from "./style";

interface Props extends Omit<ButtonProps, "icon" | "iconPosition"> {
  icon?: string; // iconify icon
  buttonClass?: string;
  tooltipTitle?: string;
  tooltipPlacement?: TooltipPlacement;
  iconStyle?: CSSProperties;
  children?: React.ReactNode;
}

const SkButton: React.FC<Props> = ({
  icon,
  buttonClass,
  tooltipTitle,
  tooltipPlacement = "bottom",
  iconStyle,
  children,
  ...rest
}) => {
  const { styles: baseStyles } = useBaseStyles();
  const { styles } = useStyles();
  return (
    <Tooltip title={tooltipTitle} placement={tooltipPlacement}>
      <Button type="text" className={classNames(styles.skButton, baseStyles.textIcon, buttonClass)} { ...rest }>
        {
          children || (
            <SvgIcon icon={icon} style={iconStyle} />
          )
        }
      </Button>
    </Tooltip>
  );
}

export default SkButton;