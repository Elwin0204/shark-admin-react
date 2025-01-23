import { Button, ButtonProps, Tooltip } from "antd";
import { TooltipPlacement } from "antd/es/tooltip";
import React, { CSSProperties } from "react";
import SvgIcon from "@/components/ui/SvgIcon";
import useBaseStyles from '@/assets/styles/base';
import useStyles from "./style";

interface Props extends Omit<ButtonProps, "icon" | "iconPosition"> {
  icon?: string; // iconify icon
  buttonClass?: string;
  tooltipTitle?: string;
  tooltipPlacement?: TooltipPlacement;
  iconStyle?: CSSProperties;
  triggerParent?: boolean;
  children?: React.ReactNode;
}

const SkButton: React.FC<Props> = ({
  icon,
  buttonClass,
  tooltipTitle,
  tooltipPlacement = "bottom",
  iconStyle,
  triggerParent,
  children,
  ...rest
}) => {
  const { styles: baseStyles } = useBaseStyles();
  const { styles, cx } = useStyles();

  function getPopupContainer(triggerNode: HTMLElement) {
    return triggerParent ? triggerNode.parentElement! : document.body;
  }

  return (
    <Tooltip title={tooltipTitle} placement={tooltipPlacement} getPopupContainer={getPopupContainer}>
      <Button type="text" className={cx(styles.skButton, baseStyles.textIcon, buttonClass)} { ...rest }>
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